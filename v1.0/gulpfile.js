"use strict";

const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync");
const combineMq = require("gulp-combine-mq");
const concat = require("gulp-concat");
const config = require("./config.json");
const del = require("del");
const gulp = require("gulp");
const htmlPartial = require("gulp-html-partial");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;

// > Dev tasks
// >> Delete Public folder
gulp.task("clean", del.bind(null, ["public"]));

// >> Process HTML files
gulp.task("html", function(done) {
  gulp
    .src(config.html.src)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      htmlPartial({
        basePath: config.html.partials
      })
    )
    .pipe(gulp.dest(config.html.dest));
  done();
});

// >> Process SCSS files (extended + sourcemaps +  autoprefixer)
gulp.task("styles", function(done) {
  gulp
    .src(config.scss.src)
    .pipe(sourcemaps.init())
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      sass({
        outputStyle: "extended"
      })
    )
    .pipe(
      combineMq({
        beautify: true
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions", "ie >= 10"],
        cascade: false
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(config.scss.dest))
    .pipe(browserSync.reload({ stream: true }));
  done();
});

// >> Concatenate JS files with sourcemaps
gulp.task('scripts-landing', function(done){
  gulp.src("_src/assets/js/landing.js")
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(concat('landing.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.js.dest))
    .pipe(browserSync.reload({ stream:true }));
  done();
});

gulp.task('scripts-main', function(done){
  gulp.src(["_src/assets/js/**/*.js", "!_src/assets/js/landing.js"])
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.js.dest))
    .pipe(browserSync.reload({ stream:true }));
  done();
});

// >> Copy image files
gulp.task("images", function(done) {
  gulp
    .src(config.images.src)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gulp.dest(config.images.dest));
  done();
});

// >> Copy fonts folder
gulp.task("fonts", function(done) {
  gulp
    .src(config.fonts.src)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gulp.dest(config.fonts.dest));
  done();
});

// >> Copy icon files
gulp.task("icons", function(done) {
  gulp
    .src(config.icons.src)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gulp.dest(config.icons.dest));
  done();
});

// > Production Tasks
// > Delete Public folder
gulp.task("clean-dist", del.bind(null, ["docs"]));

// >> Process HTML files
gulp.task("html-dist", function(done) {
  gulp
    .src(config.html.src)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      htmlPartial({
        basePath: config.html.partials
      })
    )
    .pipe(gulp.dest(config.html.dist));
  done();
});

// >> Process SCSS files (compressed + autoprefixer)
gulp.task("styles-dist", function(done) {
  gulp
    .src(config.scss.src)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      sass({
        outputStyle: "compressed"
      })
    )
    .pipe(
      combineMq({
        beautify: false
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions", "ie >= 10"],
        cascade: false
      })
    )
    .pipe(gulp.dest(config.scss.dist));
  done();
});

// >> Concatenate and minify JS files w/o sourcemaps
// >> Concatenate JS files with sourcemaps
gulp.task('scripts-landing-dist', function(done){
  gulp.src("_src/assets/js/landing.js")
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(concat('landing.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.js.dist))
    .pipe(browserSync.reload({ stream:true }));
  done();
});

gulp.task('scripts-main-dist', function(done){
  gulp.src(["_src/assets/js/**/*.js", "!_src/assets/js/landing.js"])
    .pipe(sourcemaps.init())
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.js.dist))
    .pipe(browserSync.reload({ stream:true }));
  done();
});


// >> Copy image files
gulp.task("images-dist", function(done) {
  gulp
    .src(config.images.src)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gulp.dest(config.images.dist));
  done();
});

// >> Copy fonts files
gulp.task("fonts-dist", function(done) {
  gulp
    .src(config.fonts.src)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gulp.dest(config.fonts.dist));
  done();
});
// >> Copy icon files
gulp.task("icons-dist", function(done) {
  gulp
    .src(config.icons.src)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(gulp.dest(config.icons.dist));
  done();
});

//> Watchers + BrowserSync server
gulp.task(
  "default",
  gulp.series(
    ["clean", "html", "styles", "scripts-landing","scripts-main", "images", "icons", "fonts"],
    function(done) {
      browserSync.init({
        server: {
          baseDir: "./public/"
        }
      });
      gulp.watch(config.watch.html, gulp.series(["html", "bs-reload"]));
      gulp.watch(config.images.src, gulp.series(["images", "bs-reload"]));
      gulp.watch(config.icons.src, gulp.series(["icons", "bs-reload"]));
      gulp.watch(config.scss.src, gulp.series("styles"));
      gulp.watch(config.js.src, gulp.series(["scripts-main", "bs-reload"]));
      gulp.watch(config.js.src, gulp.series(["scripts-landing", "bs-reload"]));
      gulp.watch(config.js.src, gulp.series(["fonts", "bs-reload"]));
      done();
    }
  )
);

//> Build a production-ready version of your proyect
gulp.task(
  "docs",
  gulp.series(
    [
      "clean-dist",
      "html-dist",
      "styles-dist",
      "scripts-main-dist",
      "scripts-landing-dist",
      "images-dist",
      "icons-dist",
      "fonts-dist"
    ],
    function(done) {
      console.log("🦄 Build OK!");
      done();
    }
  )
);

//> Recarga las ventanas del navegador
gulp.task("bs-reload", function(done) {
  browserSync.reload();
  done();
});