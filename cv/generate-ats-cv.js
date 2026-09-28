const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const html = path.join(__dirname, "ats-cv.html");
const pdf = path.join(__dirname, "Muhammed_Shabeeb_ATS_CV.pdf");
const chromeCandidates = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
];

const chrome = chromeCandidates.find((file) => fs.existsSync(file));
if (!chrome) {
  console.error("Chrome or Edge not found. Open ats-cv.html and print to PDF.");
  process.exit(1);
}

const result = spawnSync(
  chrome,
  [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdf}`,
    `file:///${html.replace(/\\/g, "/")}`,
  ],
  { stdio: "inherit" }
);

if (result.status !== 0) {
  process.exit(result.status || 1);
}

console.log(`Created ${pdf}`);
