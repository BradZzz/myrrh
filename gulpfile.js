require('dotenv').load()

var gulp   = require('gulp')
var fs     = require('fs')
var s3     = require('./lib/gulp-s3')
var env    = (process.env.NODE_ENV || 'development')
var plumber = require('gulp-plumber')
var ngAnnotate = require('gulp-ng-annotate')

var shell = require('gulp-shell')

// load all plugins
var $ = require('gulp-load-plugins')()

var assetCache = {
  name   : 'mytv',
  bucket : 'mytv.cached.out.assets',
  path   : '/mytv/assets/'
}

var paths = {
  css: [ 'assets/css/*.less' ],
  js: [ 'assets/js/**/*.js' ],
  html: [ 'assets/html/**/*.html' ],
  img: [ 'assets/img/**/*.*' ]
}

var ASSET_VERSION_SUFFIX = env

var onError = function (err) {
  console.log(err);
}

gulp.task('build', [ 'clean' ], function () {
  gulp.start('deploy')
})

gulp.task('deploy', [ 'minify', 'img', 'partials', 'styles' ], function () {
    console.log('consolidated')
})

gulp.task('minify', function() {
    var gulpif = require('gulp-if')
    return gulp.src('./*.html')
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe($.useref())
        .pipe(gulpif('*.js', $.uglify()))
        .pipe(gulpif('*.css', $.minifyCss({processImport: false})))
        .pipe(gulp.dest('dist'))
})

gulp.task('styles', function () {
  return gulp.src(paths.css)
    .pipe($.less())
    .pipe(gulp.dest('assets/css/'))
    .pipe($.size())
})

gulp.task('img', function() {
    return gulp.src(paths.img)
        .pipe(gulp.dest('dist/assets/img'))
})

gulp.task('partials', function () {
  return gulp.src(paths.html)
    .pipe($.minifyHtml({
      comments: true,
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(gulp.dest("dist/assets/html"))
    .pipe($.size())
})

gulp.task('clean', function () {
  return gulp.src([ 'dist', '.tmp' ], { read: false }).pipe($.clean())
})