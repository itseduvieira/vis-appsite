'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.paths = {
    dist: '.',
};

// Static Server + watching scss/html files
gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('**/*.html').on('change', browserSync.reload);
    gulp.watch('js/**/*.js').on('change', browserSync.reload);

});

gulp.task('default', ['serve']);
