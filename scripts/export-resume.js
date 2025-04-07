const fs = require("fs").promises;
const puppeteer = require("puppeteer");
const path = require("path");
const { render } = require("../src/index");

async function main() {
  const resumeJsonFile = process.argv[2];
  const outputPdfFile =
    process.argv[3] || replaceExtension(resumeJsonFile, ".pdf");

  if (!resumeJsonFile) {
    console.error(
      "Usage: node render-resume.js <path-to-resume.json> [output-path]",
    );
    process.exit(1);
  }

  const resume = JSON.parse(await fs.readFile(resumeJsonFile, "utf-8"));
  const html = await render(resume);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({ path: outputPdfFile, format: "a4", printBackground: true });

  await browser.close();
  console.log(`✅ PDF saved as ${outputPdfFile}`);
}

function replaceExtension(filePath, newExt) {
  const { dir, name } = path.parse(filePath);
  return path.join(dir, `${name}${newExt}`);
}

main().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
