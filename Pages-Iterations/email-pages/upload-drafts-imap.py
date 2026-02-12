#!/usr/bin/env python3
"""
Upload .eml files to Gmail Drafts via IMAP (no Google Cloud project required).

Prerequisites:
- Gmail IMAP enabled.
- Google account has 2-Step Verification enabled.
- App Password created for Mail.
"""

from __future__ import annotations

import argparse
import imaplib
import os
from pathlib import Path


DEFAULT_IMAP_HOST = "imap.gmail.com"
DEFAULT_IMAP_PORT = 993
DEFAULT_DRAFTS_MAILBOX = '"[Gmail]/Drafts"'
DEFAULT_EML_DIR = Path(__file__).resolve().parent / "generated" / "drafts" / "all-users-template-new" / "eml"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Upload .eml files into Gmail Drafts through IMAP.")
    parser.add_argument("--email", default=os.getenv("GMAIL_EMAIL", ""), help="Gmail address (e.g. echo@iditor.com).")
    parser.add_argument(
        "--app-password",
        default=os.getenv("GMAIL_APP_PASSWORD", ""),
        help="Google App Password (16 chars, spaces optional).",
    )
    parser.add_argument("--eml-dir", default=str(DEFAULT_EML_DIR), help="Directory containing .eml files.")
    parser.add_argument("--imap-host", default=DEFAULT_IMAP_HOST, help="IMAP host.")
    parser.add_argument("--imap-port", type=int, default=DEFAULT_IMAP_PORT, help="IMAP port.")
    parser.add_argument("--mailbox", default=DEFAULT_DRAFTS_MAILBOX, help='Target IMAP mailbox (default: "[Gmail]/Drafts").')
    parser.add_argument("--max", type=int, default=0, help="Maximum number of files to upload (0 = all).")
    parser.add_argument("--dry-run", action="store_true", help="Print files that would be uploaded without sending.")
    return parser.parse_args()


def sanitize_app_password(value: str) -> str:
    return "".join((value or "").split())


def main() -> None:
    args = parse_args()
    email = (args.email or "").strip()
    app_password = sanitize_app_password(args.app_password)
    eml_dir = Path(args.eml_dir).resolve()

    if not email:
        raise ValueError("Missing --email (or set GMAIL_EMAIL).")
    if not app_password:
        raise ValueError("Missing --app-password (or set GMAIL_APP_PASSWORD).")
    if not eml_dir.exists():
        raise FileNotFoundError(f"EML directory not found: {eml_dir}")

    files = sorted(eml_dir.glob("*.eml"))
    if args.max and args.max > 0:
        files = files[: args.max]
    if not files:
        raise FileNotFoundError(f"No .eml files found in: {eml_dir}")

    print(f"Mailbox: {args.mailbox}")
    print(f"Files to upload: {len(files)}")
    print(f"From dir: {eml_dir}")

    if args.dry_run:
        for p in files:
            print(f"[dry-run] {p.name}")
        return

    client = imaplib.IMAP4_SSL(args.imap_host, args.imap_port)
    try:
        client.login(email, app_password)
        uploaded = 0
        for p in files:
            raw = p.read_bytes()
            status, data = client.append(args.mailbox, r"(\Draft)", None, raw)
            if status != "OK":
                print(f"[failed] {p.name} -> {status} {data}")
                continue
            uploaded += 1
            print(f"[ok] {p.name}")
        print(f"Uploaded: {uploaded}/{len(files)}")
    finally:
        try:
            client.logout()
        except Exception:
            pass


if __name__ == "__main__":
    main()
