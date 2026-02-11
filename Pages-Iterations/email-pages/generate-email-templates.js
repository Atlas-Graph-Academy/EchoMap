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
  const rawHtmlKeys = new Set([
    "match1_memory_tags_html",
    "match2_memory_tags_html",
    "match3_memory_tags_html",
    "match1_intro_html",
    "match2_intro_html",
    "match3_intro_html",
  ]);
  return template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_, key) => {
    const value = data[key] || "";
    return rawHtmlKeys.has(key) ? String(value) : escapeHtml(value);
  });
}

function deriveDisplayName(record, fallbackEmail) {
  if (record.user_display_name) return record.user_display_name.trim();
  if (record.full_name) return record.full_name.trim();
  if (record.name) return record.name.trim();
  const local = String(fallbackEmail || "").split("@")[0] || "";
  const cleaned = local.replace(/[._-]+/g, " ").trim();
  if (!cleaned) return "there";
  return cleaned
    .split(/\s+/)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(" ");
}

function normalizeHandle(value, fallbackName = "") {
  const raw = String(value || "").trim();
  if (!raw && fallbackName) {
    return fallbackName.toLowerCase().replace(/[^a-z0-9_]+/g, "");
  }
  if (raw.includes("x.com/")) return raw.split("x.com/")[1].replace(/^@/, "").trim();
  return raw.replace(/^@/, "");
}

function renderMemoryTags(tagsValue, avatarUrl) {
  const tags = String(tagsValue || "")
    .split("|")
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 4);
  if (!tags.length) return "";

  const brightColors = ["108,176,210", "240,200,80", "228,120,90", "122,174,94"];
  return tags
    .map((tag, idx) => {
      const rgb = brightColors[idx % brightColors.length];
      const safeTag = escapeHtml(tag);
      const safeAvatar = escapeHtml(avatarUrl || "https://via.placeholder.com/48x48.png?text=M");
      return `<span style="display:inline-block;margin:8px 8px 0 0;padding:0 10px 0 0;border-radius:999px;background:rgba(${rgb},0.12);border:1px solid rgba(${rgb},0.34);color:rgb(${rgb});font-size:12px;line-height:22px;font-weight:600;"><img src="${safeAvatar}" alt="" width="20" height="20" style="width:20px;height:20px;border-radius:10px;vertical-align:middle;margin-right:7px;border:1px solid rgba(${rgb},0.45);" />${safeTag}</span>`;
    })
    .join("");
}

function formatMatchIntro(value) {
  let raw = String(value || "").trim();
  if (!raw) return "";

  const marks = [];
  raw = raw.replace(/"([^"]+)"/g, (_, phrase) => {
    const key = `@@Q${marks.length}@@`;
    marks.push(phrase.trim());
    return key;
  });
  raw = raw.replace(/“([^”]+)”/g, (_, phrase) => {
    const key = `@@Q${marks.length}@@`;
    marks.push(phrase.trim());
    return key;
  });

  let text = escapeHtml(raw);
  marks.forEach((phrase, idx) => {
    const key = `@@Q${idx}@@`;
    const styled = `<span style="color:#111111;font-weight:700;">${escapeHtml(
      phrase
    )}</span>`;
    text = text.replace(key, styled);
  });

  text = text.replace(/\s+[—-]\s+/g, " — ");
  text = text.replace(
    /((?:\b(?:one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+)?(?:day|days|week|weeks|month|months|year|years)\s+(?:earlier|later|prior)),\s*/gi,
    "$1,<br />"
  );
  return text;
}

function formatDateMonD(date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
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
    const userName = record.user_name || record.username || `User ${index + 1}`;
    const email = record.email || `user${index + 1}@example.com`;
    const userDisplayName = deriveDisplayName(record, email);
    const match1Handle = normalizeHandle(record.match1_twitter_handle || record["Match 1 Twitter"], record.match1_name);
    const match2Handle = normalizeHandle(record.match2_twitter_handle || record["Match 2 Twitter"], record.match2_name);
    const match3Handle = normalizeHandle(record.match3_twitter_handle || record["Match 3 Twitter"], record.match3_name);
    const promoHighlight =
      record.promo_highlight ||
      record["Promo Highlight"] ||
      record.memory_snippet ||
      record["Match 1 Promo"] ||
      "You left a memory that strongly resonated with others in Echo.";
    const memoryMangaImage = record.memory_manga_image || record["Highlight Manga"] || "";
    const expiryDays = String(record.expiry_days || "3");
    const expiryNum = Number.parseInt(expiryDays, 10);
    const expiryDate = new Date();
    if (Number.isFinite(expiryNum)) {
      expiryDate.setDate(expiryDate.getDate() + expiryNum);
    }
    const inviteCode = record.invite_code || "ODLKV";
    const inviteApplyLink =
      record.invite_apply_link ||
      record.invite_copy_link ||
      `${record.app_url || appUrlDefault}?code=${encodeURIComponent(inviteCode)}`;
    const view = {
      user_display_name: userDisplayName,
      user_name: userName,
      location: record.location || "Marina, San Francisco",
      memory_manga_image: memoryMangaImage,
      promo_highlight: promoHighlight,
      memory_time: record.memory_time || "Recently captured",
      memory_snippet:
        record.memory_snippet ||
        "building AI products, navigating the startup grind, and creating from zero.",
      memory_link: record.memory_link || "https://echo.example/memory/placeholder",
      match1_name: record.match1_name || record["Match 1 Name"] || "Match One",
      match1_headshot_png:
        record.match1_headshot_png ||
        record["Match 1 Picture"] ||
        "https://via.placeholder.com/60x60.png?text=M1",
      match1_twitter_handle: match1Handle,
      match1_twitter_url:
        record.match1_twitter_url ||
        record["Match 1 Twitter"] ||
        `https://x.com/${match1Handle}`,
      match1_topic: record.match1_topic || "Growth",
      match1_intro:
        record.match1_intro ||
        record["Match 1 Promo"] ||
        "Similar memory pattern and founder journey.",
      match1_intro_html: formatMatchIntro(
        record.match1_intro || record["Match 1 Promo"] || ""
      ),
      match1_memory_tags_html: renderMemoryTags(
        record.match1_memory_tags || "Resonance|Shared memory",
        record.match1_headshot_png || record["Match 1 Picture"]
      ),
      match1_score: record.match1_score || "87.4%",
      match1_link: record.match1_link || "https://echo.example/match/1",
      match2_name: record.match2_name || record["Match 2 Name"] || "Match Two",
      match2_headshot_png:
        record.match2_headshot_png ||
        record["Match 2 Picture"] ||
        "https://via.placeholder.com/60x60.png?text=M2",
      match2_twitter_handle: match2Handle,
      match2_twitter_url:
        record.match2_twitter_url ||
        record["Match 2 Twitter"] ||
        `https://x.com/${match2Handle}`,
      match2_topic: record.match2_topic || "Startup",
      match2_intro:
        record.match2_intro ||
        record["Match 2 Promo"] ||
        "Working through the same product bottleneck.",
      match2_intro_html: formatMatchIntro(
        record.match2_intro || record["Match 2 Promo"] || ""
      ),
      match2_memory_tags_html: renderMemoryTags(
        record.match2_memory_tags || "Pattern overlap|Builder mindset",
        record.match2_headshot_png || record["Match 2 Picture"]
      ),
      match2_score: record.match2_score || "85.4%",
      match2_link: record.match2_link || "https://echo.example/match/2",
      match3_name: record.match3_name || record["Match 3 Name"] || "Match Three",
      match3_headshot_png:
        record.match3_headshot_png ||
        record["Match 3 Picture"] ||
        "https://via.placeholder.com/60x60.png?text=M3",
      match3_twitter_handle: match3Handle,
      match3_twitter_url:
        record.match3_twitter_url ||
        record["Match 3 Twitter"] ||
        `https://x.com/${match3Handle}`,
      match3_topic: record.match3_topic || "Growth",
      match3_intro:
        record.match3_intro ||
        record["Match 3 Promo"] ||
        "Strong overlap in startup building memories.",
      match3_intro_html: formatMatchIntro(
        record.match3_intro || record["Match 3 Promo"] || ""
      ),
      match3_memory_tags_html: renderMemoryTags(
        record.match3_memory_tags || "Depth|Long-term thinking",
        record.match3_headshot_png || record["Match 3 Picture"]
      ),
      match3_score: record.match3_score || "84.2%",
      match3_link: record.match3_link || "https://echo.example/match/3",
      invite_code: inviteCode,
      expiry_days: expiryDays,
      invite_expires_on: record.invite_expires_on || formatDateMonD(expiryDate),
      invite_apply_link: inviteApplyLink,
      app_url: record.app_url || appUrlDefault,
      kobe_email: record.kobe_email || "echo@iditor.com",
    };

    const html = applyTemplate(template, view);
    const baseName = `${String(index + 1).padStart(2, "0")}-${slugify(userName)}-${slugify(email.split("@")[0])}.html`;
    fs.writeFileSync(path.join(outputDir, baseName), html, "utf8");
    count += 1;
  });

  console.log(`Generated ${count} email HTML file(s) in: ${outputDir}`);
}

main();
