const { src, dest, parallel, watch, series } = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const minifyCSS = require("gulp-clean-css");
const uglify = require("gulp-terser");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
function compileSCSS(cb) {
  watch("src/scss/*.scss", function() {
    return src("src/scss/*.scss")
      .pipe(sass())
      .pipe(minifyCSS())
      .pipe(dest("src/css/"));
  });
  cb();
}

function compileJS(cb) {
  watch("src/js/scripts.js").on("change", function() {
    return src("src/js/scripts.js")
      .pipe(uglify())
      .pipe(rename({ extname: ".min.js" }))
      .pipe(dest("src/js"));
  });
  cb();
}

function runServer(cb) {
  browserSync.init({
    server: {
      baseDir: "src/"
    }
  });
  watch("src/*.html").on("change", browserSync.reload);
  watch("src/css/*.css").on("change", browserSync.reload);
  cb();
}

exports.default = parallel(runServer, compileSCSS, compileJS);
