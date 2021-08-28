'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var replace = require('gulp-replace');
var del = require('del');

gulp.paths = {
    dist: 'dist',
};

var paths = gulp.paths;

// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        serveStatic: ['./'],
        port: 5000,
        proxy: 'https://app.visualnoar.com.br.dev',
        https: {
            key: './cert/app.visualnoar.com.br.dev.key',
            cert: './cert/app.visualnoar.com.br.dev.crt'
        }
    });

    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

});

gulp.task('clean:dist', function () {
    return del(paths.dist);
});

gulp.task('copy:css', function() {
    return gulp.src('./css/**/*')
    .pipe(gulp.dest(paths.dist+'/css'));
 });
 
 gulp.task('copy:img', function() {
    return gulp.src('./images/**/*')
    .pipe(gulp.dest(paths.dist+'/images'));
 });
 
 gulp.task('copy:fonts', function() {
    return gulp.src('./fonts/**/*')
    .pipe(gulp.dest(paths.dist+'/fonts'));
 });

 gulp.task('copy:js', function() {
    return gulp.src('./js/**/*')
    .pipe(replace(/http:\/\/localhost:4000\//, 'https://vis-api.herokuapp.com/'))
    .pipe(gulp.dest(paths.dist+'/js'));
 });

 gulp.task('copy:html', function() {
    return gulp.src('index.html')
    .pipe(gulp.dest(paths.dist+'/'));
 });
 
 gulp.task('copy:favicon', function() {
    return gulp.src('favicon.ico')
    .pipe(gulp.dest(paths.dist+'/'));
});

gulp.task('build:dist', function(callback) {
    runSequence('clean:dist', 'copy:css', 'copy:img', 'copy:fonts', 'copy:js', 'copy:html', 'copy:favicon', callback);
});

gulp.task('default', ['serve']);