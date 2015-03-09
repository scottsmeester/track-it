var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify');

var paths = {
  scripts: {
    src: 'public/scripts/*.js',
    dest: 'public/minified'
  },
  css: {
    src: 'public/*.css',
    dest: 'public/minified'
  }
};

gulp.task('default', ['scripts','css'], function(){
  gulp.watch(paths.scripts.src, ['scripts']);
  gulp.watch(paths.css.src, ['css']);
});

gulp.task('scripts', function(){
  return gulp.src(paths.scripts.src)
    .pipe(concat('output.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(rename({ suffix: '.min' }))
    .pipe(notify({message: 'Scripts minification complete!'}));
});

gulp.task('css', function(){
  return gulp.src(paths.css.src)
    .pipe(concat('output.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(rename({ suffix: '.min' }))
    .pipe(notify({message: 'Styles minification complete!'}));
});

