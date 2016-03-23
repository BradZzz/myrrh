require('dotenv').load()

var gulp   = require('gulp')
var fs     = require('fs')
var env    = (process.env.NODE_ENV || 'development')

// load all plugins
var $ = require('gulp-load-plugins')()

var paths = {
  css: [ 'assets/css/*.less' ],
  js: [ 'assets/js/**/*.js' ],
  html: [ 'assets/html/**/*.html' ]
}

var ASSET_VERSION_SUFFIX = env

var onError = function (err) {  
  console.log(err);
};

gulp.task('styles', function () {
  return gulp.src(paths.css)
    .pipe($.less())
    .pipe(gulp.dest('assets/css/'))
    .pipe($.size())
})