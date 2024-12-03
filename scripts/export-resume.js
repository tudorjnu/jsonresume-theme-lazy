const { exec } = require("child_process");

// Get arguments from the command line
const args = process.argv.slice(2);
const resume = args[0]; // Resume JSON file
const output = args[1]; // Output file

if (!resume || !output) {
  console.error("Usage: npm run export-resume -- <resume.json> <output.pdf>");
  process.exit(1);
}

// Construct the command
const command = `resume export ${output} --format pdf --theme . --resume ${resume}`;

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
