#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const appUrlDefault = "https://apps.apple.com/us/app/echochat/id6736381852";
const inputPath = process.argv[2] || path.join(__dirname, "recipients.sample.csv");
const outputDir = process.argv[3] || path.join(__dirname, "generated");
const templatePath = path.join(__dirname, "email-template.html");

function parseCsv(csv) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i += 1) {
    const ch = csv[i];
    const next = csv[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    if (row.some((x) => x.trim() !== "")) rows.push(row);
  }
  return rows;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function applyTemplate(template, data) {
  return template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_, key) =>
    escapeHtml(data[key] || "")
  );
}

function main() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input CSV not found: ${inputPath}`);
  }
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  const csvContent = fs.readFileSync(inputPath, "utf8");
  const rows = parseCsv(csvContent);
  if (rows.length < 2) {
    throw new Error("CSV must contain a header row and at least one data row.");
  }

  const header = rows[0].map((h) => h.trim());
  const records = rows.slice(1).map((values) => {
    const record = {};
    header.forEach((key, idx) => {
      record[key] = (values[idx] || "").trim();
    });
    return record;
  });

  fs.mkdirSync(outputDir, { recursive: true });

  const template = fs.readFileSync(templatePath, "utf8");
  let count = 0;

  records.forEach((record, index) => {
    const userName = record.user_name || `User ${index + 1}`;
    const email = record.email || `user${index + 1}@example.com`;
    const view = {
      user_name: userName,
      location: record.location || "Marina, San Francisco",
      memory_snippet:
        record.memory_snippet ||
        "building AI products, navigating the startup grind, and creating from zero.",
      memory_link: record.memory_link || "https://echo.example/memory/placeholder",
      match1_name: record.match1_name || "Match One",
      match1_intro: record.match1_intro || "Similar memory pattern and founder journey.",
      match1_link: record.match1_link || "https://echo.example/match/1",
      match2_name: record.match2_name || "Match Two",
      match2_intro: record.match2_intro || "Working through the same product bottleneck.",
      match2_link: record.match2_link || "https://echo.example/match/2",
      match3_name: record.match3_name || "Match Three",
      match3_intro: record.match3_intro || "Strong overlap in startup building memories.",
      match3_link: record.match3_link || "https://echo.example/match/3",
      invite_code: record.invite_code || "ODLKV",
      expiry_days: record.expiry_days || "3",
      app_url: record.app_url || appUrlDefault,
      kobe_email: record.kobe_email || "kobe@example.com",
    };

    const html = applyTemplate(template, view);
    const baseName = `${String(index + 1).padStart(2, "0")}-${slugify(userName)}-${slugify(email.split("@")[0])}.html`;
    fs.writeFileSync(path.join(outputDir, baseName), html, "utf8");
    count += 1;
  });

  console.log(`Generated ${count} email HTML file(s) in: ${outputDir}`);
}

main();
