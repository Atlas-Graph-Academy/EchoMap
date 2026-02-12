#!/usr/bin/env python3
"""
Upload generated base64url MIME payloads as Gmail drafts.

Requires OAuth client credentials for the target Gmail account.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build


SCOPES = ["https://www.googleapis.com/auth/gmail.compose"]


def parse_args() -> argparse.Namespace:
    here = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser(description="Upload generated email payloads to Gmail drafts.")
    parser.add_argument(
        "--manifest",
        default=str(here / "generated" / "drafts" / "test-shot" / "manifest.json"),
        help="Path to manifest.json created by generate-cold-email-drafts.py.",
    )
    parser.add_argument(
        "--credentials",
        default=str(here / "gmail-credentials.json"),
        help="OAuth client credentials JSON from Google Cloud Console.",
    )
    parser.add_argument(
        "--token",
        default=str(here / "gmail-token.json"),
        help="OAuth token cache path.",
    )
    parser.add_argument("--max", type=int, default=0, help="Optional max drafts to upload (0 = all).")
    return parser.parse_args()


def get_credentials(credentials_path: Path, token_path: Path) -> Credentials:
    creds = None
    if token_path.exists():
        creds = Credentials.from_authorized_user_file(str(token_path), SCOPES)

    if creds and creds.valid:
        return creds
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        token_path.write_text(creds.to_json(), encoding="utf-8")
        return creds

    if not credentials_path.exists():
        raise FileNotFoundError(
            f"Credentials file not found: {credentials_path}\n"
            "Create OAuth Desktop credentials and save JSON to this path."
        )

    flow = InstalledAppFlow.from_client_secrets_file(str(credentials_path), SCOPES)
    creds = flow.run_local_server(port=0)
    token_path.write_text(creds.to_json(), encoding="utf-8")
    return creds


def main() -> None:
    args = parse_args()
    manifest_path = Path(args.manifest).resolve()
    credentials_path = Path(args.credentials).resolve()
    token_path = Path(args.token).resolve()

    if not manifest_path.exists():
        raise FileNotFoundError(f"Manifest not found: {manifest_path}")

    rows = json.loads(manifest_path.read_text(encoding="utf-8"))
    if not isinstance(rows, list):
        raise ValueError("Manifest JSON must be a list.")

    if args.max and args.max > 0:
        rows = rows[: args.max]

    creds = get_credentials(credentials_path, token_path)
    service = build("gmail", "v1", credentials=creds)

    uploaded = 0
    for row in rows:
        raw_path = Path(row.get("raw_b64url_path", "")).resolve()
        if not raw_path.exists():
            print(f"Skip missing payload: {raw_path}")
            continue
        raw = raw_path.read_text(encoding="utf-8").strip()
        if not raw:
            print(f"Skip empty payload: {raw_path}")
            continue

        body = {"message": {"raw": raw}}
        resp = service.users().drafts().create(userId="me", body=body).execute()
        uploaded += 1
        print(
            f"Draft {uploaded}: to={row.get('to_email','')} "
            f"subject={row.get('subject','')} draft_id={resp.get('id','')}"
        )

    print(f"Uploaded drafts: {uploaded}")


if __name__ == "__main__":
    main()
