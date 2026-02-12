# Echo Cold Email Pipeline

This folder contains the end-to-end workflow for generating personalized cold-email drafts from `cold_email_list.xlsx`, reviewing them, uploading them into Gmail Drafts, and scheduling sends.

## Files

- `email-template-new.html`: Current recommended email template.
- `email-template.html`: Older template variant.
- `generate-cold-email-drafts.py`: Main generator (XLSX -> HTML + EML + Gmail raw payload).
- `upload-drafts-imap.py`: Upload EML files directly into Gmail Drafts via IMAP (no Google Cloud project required).
- `upload-gmail-drafts.py`: Optional Gmail API uploader (requires Google Cloud OAuth project).
- `cold_email_list.xlsx`: Source recipient + memory/match data.
- `generated/assets/images`: Local image assets used for inline images.

## Recommended Team Workflow (No Google Cloud Project)

### 1) Prepare Template

Use `email-template-new.html`.

Important:
- Keep personalization fields as placeholders (for example `{{user_display_name}}`, `{{match1_name}}`, `{{user_email}}`).
- You can edit wording/tone outside placeholders freely.
- The generator will sanitize common mojibake issues from source data.

### 2) Generate a Small Test Batch

From repo root:

```bash
python Pages-Iterations/email-pages/generate-cold-email-drafts.py \
  --xlsx Pages-Iterations/email-pages/cold_email_list.xlsx \
  --template Pages-Iterations/email-pages/email-template-new.html \
  --assets-dir Pages-Iterations/email-pages/generated/assets/images \
  --output-dir Pages-Iterations/email-pages/generated/drafts/test-shot \
  --start 1 \
  --limit 3
```

Review:
- `generated/drafts/test-shot/html/*.html` (quick visual check)
- `generated/drafts/test-shot/manifest.csv`
- `generated/drafts/test-shot/warnings.txt`

### 3) Generate Full Batch

```bash
python Pages-Iterations/email-pages/generate-cold-email-drafts.py \
  --xlsx Pages-Iterations/email-pages/cold_email_list.xlsx \
  --template Pages-Iterations/email-pages/email-template-new.html \
  --assets-dir Pages-Iterations/email-pages/generated/assets/images \
  --output-dir Pages-Iterations/email-pages/generated/drafts/all-users-template-new \
  --start 1 \
  --limit 200
```

Expected output:
- `html/*.html` (browser preview)
- `eml/*.eml` (Gmail/Outlook message files with inline images)
- `raw/*.b64url.txt` (Gmail API raw payloads)
- `manifest.json`, `manifest.csv`, `warnings.txt`

### 4) Upload EML Files to Gmail Drafts (Recommended)

This path preserves inline images better than dragging files into Outlook/Gmail UI.

#### 4.1 Gmail Account Setup

For sender account (example `echo@iditor.com`):
- In Gmail settings -> `Forwarding and POP/IMAP` -> enable `IMAP`.
- In Google Account security -> enable `2-Step Verification`.
- Create an App Password at `https://myaccount.google.com/apppasswords` (Mail).

#### 4.2 Upload Test Draft

```bash
python Pages-Iterations/email-pages/upload-drafts-imap.py \
  --email echo@iditor.com \
  --app-password "YOUR_16_CHAR_APP_PASSWORD" \
  --eml-dir Pages-Iterations/email-pages/generated/drafts/all-users-template-new/eml \
  --max 1
```

If preview looks good, upload all:

```bash
python Pages-Iterations/email-pages/upload-drafts-imap.py \
  --email echo@iditor.com \
  --app-password "YOUR_16_CHAR_APP_PASSWORD" \
  --eml-dir Pages-Iterations/email-pages/generated/drafts/all-users-template-new/eml
```

Tip:
- Use environment variables instead of command history for secrets:
  - `GMAIL_EMAIL`
  - `GMAIL_APP_PASSWORD`

### 5) Schedule Send in Gmail

Gmail does not provide bulk "Schedule send" directly from multi-selected drafts.

Two options:

- Manual:
  - Open each draft.
  - Click arrow next to `Send` -> `Schedule send`.

- Automated (recommended for batches):
  - Use Google Apps Script to send matching drafts at a target timestamp.
  - Example run date used in testing: February 12, 2026 at 9:00 AM PST.

Apps Script sample:

```javascript
function sendEchoDrafts() {
  const prefix = "Echo found 3 memory matches for you,";
  const drafts = GmailApp.getDrafts();
  let sent = 0;

  drafts.forEach(d => {
    const subject = d.getMessage().getSubject() || "";
    if (subject.startsWith(prefix)) {
      d.send();
      sent++;
    }
  });

  Logger.log("Sent drafts: " + sent);
}

function scheduleEchoDraftsOnce() {
  const when = new Date("2026-02-12T09:00:00-08:00");
  ScriptApp.newTrigger("sendEchoDrafts").timeBased().at(when).create();
}
```

## Optional Workflow: Gmail API Upload (Requires Google Cloud Project)

If your team wants Gmail API draft creation instead of IMAP:

1. Create Google Cloud project.
2. Enable Gmail API.
3. Configure OAuth consent screen.
4. Create OAuth Client ID (Desktop App).
5. Download `gmail-credentials.json` into this folder.
6. Run:

```bash
python Pages-Iterations/email-pages/upload-gmail-drafts.py \
  --manifest Pages-Iterations/email-pages/generated/drafts/test-shot/manifest.json \
  --credentials Pages-Iterations/email-pages/gmail-credentials.json \
  --token Pages-Iterations/email-pages/gmail-token.json \
  --max 3
```

## Troubleshooting

- Missing images after dragging drafts through Outlook:
  - Re-upload using `upload-drafts-imap.py` instead of Outlook drag/drop.
- Mojibake text issues:
  - Regenerate drafts with `generate-cold-email-drafts.py` (current script includes repair logic).
- Warning `no local image group matched`:
  - That row will use remote image URLs instead of local inline assets.
