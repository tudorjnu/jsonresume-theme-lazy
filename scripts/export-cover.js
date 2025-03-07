import { promises as fs } from "fs";
import puppeteer from "puppeteer";
import path from "path";
import pug from "pug";
import { marked } from "marked";
import helper from "../src/lib/helper.js";

async function main() {
  const resumeJsonFile = process.argv[2];
  const coverMarkdownFile = process.argv[3];
  const outputPdfFile =
    process.argv[4] || replaceExtension(resumeJsonFile, "-cover.pdf");

  if (!resumeJsonFile || !coverMarkdownFile) {
    console.error(
      "Usage: node render_cover.js <path-to-resume.json> [output-path] <path-to-cover.md>",
    );
    process.exit(1);
  }

  // Read and parse resume and cover markdown
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
