# Echo Email Template Pipeline

This folder contains:

- `email-template.html`: Gmail-safe white/light HTML template with placeholders.
- `generate-email-templates.js`: CSV-to-HTML generator.
- `generate-cold-email-drafts.py`: XLSX-to-HTML/.eml/Gmail-payload generator.
- `upload-gmail-drafts.py`: Optional Gmail API uploader for generated payloads.
- `recipients.sample.csv`: Example input format.
- `generated/`: Output HTML files (created after running the script).

## 1) Prepare your recipient list

Copy `recipients.sample.csv` and replace rows with your real users.

For 30 emails, add 30 rows (one row per person).

## 2) Generate personalized HTML files

From repo root:

```bash
node Pages-Iterations/email-pages/generate-email-templates.js \
  Pages-Iterations/email-pages/recipients.sample.csv \
  Pages-Iterations/email-pages/generated
```

## 3) Use in Gmail

- Open each file in `generated/`.
- Copy the rendered body content and paste into Gmail compose.
- Keep links absolute (`https://...`) so they remain clickable after paste.

## XLSX + Gmail Draft Workflow (recommended)

Generate a small review batch (3 rows by default) directly from `cold_email_list.xlsx`:

```bash
python Pages-Iterations/email-pages/generate-cold-email-drafts.py
```

Custom example:

```bash
python Pages-Iterations/email-pages/generate-cold-email-drafts.py \
  --xlsx Pages-Iterations/email-pages/cold_email_list.xlsx \
  --template Pages-Iterations/email-pages/email-template.html \
  --assets-dir Pages-Iterations/email-pages/generated/assets/images \
  --output-dir Pages-Iterations/email-pages/generated/drafts/test-shot \
  --start 1 \
  --limit 3
```

Outputs:
- `html/*.html`: browser preview files
- `eml/*.eml`: RFC822 messages with inline images
- `raw/*.b64url.txt`: Gmail API-ready raw payloads
- `manifest.json` / `manifest.csv`: row-to-output mapping and warnings

Optional: upload generated payloads as Gmail drafts (for direct Gmail preview):

```bash
python Pages-Iterations/email-pages/upload-gmail-drafts.py \
  --manifest Pages-Iterations/email-pages/generated/drafts/test-shot/manifest.json \
  --credentials Pages-Iterations/email-pages/gmail-credentials.json \
  --token Pages-Iterations/email-pages/gmail-token.json \
  --max 3
```

Notes:
- `gmail-credentials.json` should be an OAuth Desktop client JSON from Google Cloud Console.
- Drafts are created under the authenticated Gmail account (e.g., `Echo@iditor.com`).
