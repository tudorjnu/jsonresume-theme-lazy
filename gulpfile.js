const { src, dest, watch, series } = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const bs = require("browser-sync").create();

const fs = require("fs");
const helper = require("./src/lib/helper.js");

function css() {
  return src("./src/styles.scss")
    .pipe(sass().on("error", sass.logError)) // Handle Sass errors
    .pipe(dest("./dist/"));
}

function html() {
  const resume = JSON.parse(fs.readFileSync("./resume.json", "utf-8"));

  return src("./src/template.pug")
    .pipe(pug({ data: { resume, helper } }))
    .pipe(dest("./dist"));
}

function serve() {
  bs.init({
    server: { baseDir: "./dist/", index: "template.html" },
    ui: false,
    open: false,
  });

  watch("./src/**/*.scss", series(css, html));
  watch("./src/scss/sections/*.scss", series(css, html));
  watch("./src/scss/*.scss", series(css, html));
  watch("./src/*.scss", series(css, html));
  watch(["./src/**/*.pug", "./resume.json"], html);
  bs.watch("./dist/*.html").on("change", bs.reload);
}

exports.css = css;
exports.default = series(css, html, serve);
