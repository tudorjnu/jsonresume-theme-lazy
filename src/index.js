const pug = require("pug");
const helper = require("./lib/helper");
const path = require("path");

const render = (resume) =>
  pug.renderFile(path.join(__dirname, "resume.pug"), {
    resume,
    helper,
  });

const pdfRenderOptions = {
  mediaType: "print",
};

module.exports = {
  render,
  pdfRenderOptions,
};
