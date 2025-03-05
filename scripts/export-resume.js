const path = require("path");
const { exec } = require("child_process");

const args = process.argv.slice(2);
const resumeJson = args[0];
let outputPdf = args[1];

if (!resumeJson) {
  console.error("Usage: npm run export-resume -- <resume.json> [<output.pdf>]");
  process.exit(1);
}

if (!outputPdf) {
  const base = path.basename(resumeJson, path.extname(resumeJson));
  outputPdf = `${base}.pdf`;
}

let outputFilePath;
if (path.isAbsolute(outputPdf)) {
  outputFilePath = outputPdf;
} else {
  outputFilePath = path.join("resumes-pdf", outputPdf);
}

const command = `resume export "${outputFilePath}" --format pdf --theme . --resume "${resumeJson}"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});
