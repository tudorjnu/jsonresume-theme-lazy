const path = require("path");
const { exec } = require("child_process");

// Get arguments from the command line
const args = process.argv.slice(2);
const resumeJson = args[0]; // Resume JSON file
let outputPdf = args[1]; // Optional output PDF name

// Validate arguments
if (!resumeJson) {
  console.error("Usage: npm run export-resume -- <resume.json> [<output.pdf>]");
  process.exit(1);
}

// If no output PDF name is specified, derive it from the JSON filename
if (!outputPdf) {
  const base = path.basename(resumeJson, path.extname(resumeJson));
  outputPdf = `${base}.pdf`;
}

// Ensure outputPdf is a valid path
let outputFilePath;
if (path.isAbsolute(outputPdf)) {
  // If outputPdf is an absolute path, use it directly
  outputFilePath = outputPdf;
} else {
  // Otherwise, construct the path relative to "resumes-pdf"
  outputFilePath = path.join("resumes-pdf", outputPdf);
}

// Construct the command for the resume-cli
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
