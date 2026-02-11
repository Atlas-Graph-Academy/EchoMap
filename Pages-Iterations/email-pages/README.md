# Echo Email Template Pipeline

This folder contains:

- `email-template.html`: Gmail-safe white/light HTML template with placeholders.
- `generate-email-templates.js`: CSV-to-HTML generator.
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
