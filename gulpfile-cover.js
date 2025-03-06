const { src, dest, watch, series, parallel } = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const fs = require("fs");
const marked = require("marked");
const helper = require("./src/lib/helper.js");

function css() {
  return src("./src/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./dist/"));
}

function html() {
  const resume = JSON.parse(fs.readFileSync("./resume.json", "utf-8"));
  const coverMarkdown = fs.readFileSync("./cover.md", "utf-8");
  const coverHtml = marked.parse(coverMarkdown);

  return src("./src/cover.pug")
    .pipe(
      pug({
        data: { resume, helper, coverBody: coverHtml },
      }),
    )
    .pipe(dest("./dist"));
}

function serve() {
  browserSync.init({
    server: { baseDir: "./dist/", index: "cover.html" },
    ui: false,
    open: false,
  });

  watch("./src/**/*.scss", series(css, html));
  watch("./src/**/*.pug", html);
  watch(["./cover.md"], html);
  browserSync.watch("./dist/*.html").on("change", browserSync.reload);
}

exports.css = css;
exports.default = series(css, html, serve);
