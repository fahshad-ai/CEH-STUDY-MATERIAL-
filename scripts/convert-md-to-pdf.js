import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { join, resolve, basename } from "node:path";
import { marked } from "marked";
import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const ROOT = resolve("content/markdown");
const OUTPUT_DIR = resolve("content/pdf");

const HTML_TEMPLATE = (title, body) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #1a1a2e; border-bottom: 2px solid #e94560; padding-bottom: 8px; }
    h2 { color: #16213e; margin-top: 2em; }
    h3 { color: #0f3460; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-size: 0.9em; }
    pre { background: #2d2d2d; color: #f8f8f2; padding: 16px; border-radius: 6px; overflow-x: auto; }
    pre code { background: none; color: inherit; padding: 0; }
    blockquote { border-left: 4px solid #e94560; margin: 0; padding: 0 16px; color: #555; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
    th { background: #f4f4f4; }
    hr { border: none; border-top: 1px solid #ddd; margin: 2em 0; }
    .cover { display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 90vh; text-align: center; page-break-after: always; }
    .cover h1 { font-size: 2.4em; border: none; color: #1a1a2e; margin-bottom: 0.2em; }
    .cover h2 { color: #16213e; font-weight: 400; font-size: 1.3em; margin-top: 0; }
    .cover .author { font-size: 1.15em; color: #555; margin-top: 1.5em; }
    .cover .author a { color: #0a66c2; text-decoration: none; }
    .cover .howto { max-width: 600px; margin: 2.5em auto 0; text-align: left; }
    .cover .howto h3 { color: #0f3460; margin-bottom: 0.4em; }
    .cover .howto p { color: #444; font-size: 0.95em; }
    .cover .disclaimer { font-size: 0.82em; color: #999; max-width: 600px; margin-top: 2.5em; border-top: 1px solid #ddd; padding-top: 1em; }
    .toc { page-break-after: always; padding-top: 2em; }
    .toc h2 { color: #1a1a2e; border-bottom: 2px solid #e94560; padding-bottom: 8px; margin-bottom: 1em; }
    .toc ol { list-style: none; counter-reset: toc-counter; padding-left: 0; }
    .toc ol li { counter-increment: toc-counter; margin: 0.6em 0; font-size: 1.05em; }
    .toc ol li::before { content: counter(toc-counter) ". "; font-weight: bold; color: #0f3460; }
    .toc ol li a { color: #16213e; text-decoration: none; }
    .toc ol li a:hover { text-decoration: underline; }
  </style>
</head>
<body>
${body}
</body>
</html>`;

const DOMAIN_TITLES = [
  "Information Security and Ethical Hacking",
  "Reconnaissance Techniques",
  "System Hacking",
  "Network and Perimeter Hacking",
  "Web Application Hacking",
  "Wireless Network Hacking",
  "Mobile Platform, IoT, and OT Hacking",
  "Cloud Computing",
  "Cryptography",
];

function buildCoverPage() {
  return `
<div class="cover">
  <h1>CEH Study Material</h1>
  <h2>Complete Notes &mdash; All 9 Domains, 154 Practice Questions</h2>
  <div class="author">By Fahshad &mdash; <a href="https://www.linkedin.com/in/fahshad-m-48134a1aa/">linkedin.com/in/fahshad-m-48134a1aa</a></div>
  <div class="howto">
    <h3>How to Use This Guide</h3>
    <p>Each topic includes a <strong>Core Concept</strong> explanation, <strong>Key Tools</strong> and commands, <strong>Common Pitfalls</strong> to avoid, and a <strong>Practice Question</strong> with a detailed answer explanation. Content is organized by the 9 official CEH exam domains.</p>
  </div>
  <div class="disclaimer">This is an independent study resource created for exam preparation. It is not affiliated with, endorsed by, or sponsored by EC-Council. CEH is a registered trademark of EC-Council.</div>
</div>`;
}

function buildTOC() {
  const items = DOMAIN_TITLES.map(
    (title, i) =>
      `<li><a href="#domain-${i + 1}">Domain ${i + 1}: ${title}</a></li>`
  ).join("\n    ");
  return `
<div class="toc">
  <h2>Table of Contents</h2>
  <ol>
    ${items}
  </ol>
</div>`;
}

async function getFolders(dir) {
  const entries = await readdir(dir);
  const folders = [];
  for (const entry of entries) {
    if ((await stat(join(dir, entry))).isDirectory()) {
      folders.push(entry);
    }
  }
  return folders;
}

async function convertFolder(folderName, browser) {
  const folderPath = join(ROOT, folderName);
  const entries = await readdir(folderPath);
  const mdFiles = entries
    .filter((f) => f.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (mdFiles.length === 0) {
    console.log(`  Skipping "${folderName}" (no .md files)`);
    return;
  }

  console.log(`  ${mdFiles.length} files -> ${folderName}.pdf`);

  const contents = await Promise.all(
    mdFiles.map((f) => readFile(join(folderPath, f), "utf-8"))
  );

  const isBundle = folderName === "ceh-bundle";

  let combinedMd;
  if (isBundle) {
    const domainParts = contents.map((md, i) => {
      const anchor = `<a id="domain-${i + 1}"></a>\n\n`;
      return anchor + md;
    });
    combinedMd =
      buildCoverPage() +
      buildTOC() +
      domainParts.join(
        '\n\n<hr style="page-break-after: always;">\n\n'
      );
  } else {
    combinedMd = contents.join(
      '\n\n<hr style="page-break-after: always;">\n\n'
    );
  }

  const htmlBody = marked.parse(combinedMd);
  const pdfTitle = isBundle
    ? "CEH Study Material \u2014 Complete Notes"
    : folderName;

  const page = await browser.newPage();
  await page.setContent(HTML_TEMPLATE(pdfTitle, htmlBody), {
    waitUntil: "networkidle0",
  });

  await page.pdf({
    path: join(OUTPUT_DIR, `${folderName}-v3.pdf`),
    format: "A4",
    margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<span></span>`,
    footerTemplate: `<div style="font-size:8px;width:100%;text-align:center;color:#999;">CEH Study Material &mdash; Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>`,
  });

  await page.close();
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const folders = await getFolders(ROOT);

  if (folders.length === 0) {
    console.error("No folders found in content/markdown/");
    process.exit(1);
  }

  console.log(`Found ${folders.length} folder(s) to convert:\n`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const folder of folders) {
    await convertFolder(folder, browser);
  }

  await browser.close();
  console.log(`\nDone! PDFs saved to ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
