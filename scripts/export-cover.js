const fs = require("fs").promises;
const puppeteer = require("puppeteer");
const path = require("path");
const pug = require("pug");
const { marked } = require("marked");
const helper = require("../src/lib/helper");

async function main() {
  const resumeJsonFile = process.argv[2];
  const coverMarkdownFile = process.argv[3];
  const outputPdfFile =
    process.argv[4] || replaceExtension(resumeJsonFile, "-cover.pdf");

  if (!resumeJsonFile || !coverMarkdownFile) {
    console.error(
      "Usage: node render_cover.js <path-to-resume.json> <path-to-cover.md> [output-path]",
    );
    process.exit(1);
  }

  // Read and parse resume and cover Markdown
  const resume = JSON.parse(await fs.readFile(resumeJsonFile, "utf-8"));
  const coverMarkdown = await fs.readFile(coverMarkdownFile, "utf-8");
  const coverHtml = marked.parse(coverMarkdown);

  // Render Pug template directly
  const html = pug.renderFile("src/cover.pug", {
    resume,
    helper,
    coverBody: coverHtml,
  });

  // Generate PDF using Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({ path: outputPdfFile, format: "a4", printBackground: true });

  await browser.close();
  console.log(`✅ Cover letter PDF saved as ${outputPdfFile}`);
}

function replaceExtension(filePath, newExt) {
  const { dir, name } = path.parse(filePath);
  return path.join(dir, `${name}${newExt}`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
