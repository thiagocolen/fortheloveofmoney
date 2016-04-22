var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


//www folder
gulp.task('dependencies', function() {
    // HTML
    gulp.src('./dev/index.html')
        .pipe(gulp.dest('./www/'));
});


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./www/"
        }
    });
});


gulp.task('default', ['dependencies', 'browser-sync'], function() {
    gulp.watch(['dev/**/*'], ['inject', reload]);
});