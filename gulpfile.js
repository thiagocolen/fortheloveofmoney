var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var clean = require('gulp-clean');
var less = require('gulp-less');



//Clean WWW Folder 
gulp.task('clean', function() {
    return gulp.src('./www/', { read: false })
        .pipe(clean());
});

// WWW Folder
gulp.task('dependencies', function() {


    // app
    gulp.src('./dev/scripts/*.js')
        .pipe(gulp.dest('./www/scripts/'));



    // scripts
    gulp.src('./bower_components/jquery/dist/jquery.js')
        .pipe(gulp.dest('./www/scripts/'));

    gulp.src('./bower_components/bootstrap/dist/js/bootstrap.js')
        .pipe(gulp.dest('./www/scripts/'));

    gulp.src('./bower_components/angular/angular.js')
        .pipe(gulp.dest('./www/scripts/'));

    gulp.src('./bower_components/angular-route/angular-route.js')
        .pipe(gulp.dest('./www/scripts/'));

    gulp.src('./bower_components/firebase/firebase.js')
        .pipe(gulp.dest('./www/scripts/'));

    gulp.src('./bower_components/angularfire/dist/angularfire.js')
        .pipe(gulp.dest('./www/scripts/'));

    gulp.src('./bower_components/Chart.js/Chart.js')
        .pipe(gulp.dest('./www/scripts/'));

    gulp.src('./bower_components/angular-chart.js/dist/angular-chart.js')
        .pipe(gulp.dest('./www/scripts/'));

    gulp.src('./bower_components/angular-hotkeys/build/hotkeys.js')
        .pipe(gulp.dest('./www/scripts/'));



    //css
    gulp.src('./bower_components/angular-chart.js/dist/angular-chart.css')
        .pipe(gulp.dest('./www/styles/'));

    gulp.src('./bower_components/angular-hotkeys/build/hotkeys.css')
        .pipe(gulp.dest('./www/styles/'));


    // gulp.src('./bower_components/bootstrap/dist/css/bootstrap.css')
        // .pipe(gulp.dest('./www/styles/'));

    gulp.src('./dev/styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('./www/styles/'));

    gulp.src('./dev/styles/bootstrap/bootstrap.less')
        .pipe(less())
        .pipe(gulp.dest('./www/styles/'));



    //fonts 
    gulp.src('./bower_components/bootstrap/dist/fonts/*.*')
        .pipe(gulp.dest('./www/fonts/'));




    //images 
    gulp.src('./dev/images/*.*')
        .pipe(gulp.dest('./www/images/'));




    // htmls
    gulp.src('./dev/htmls/partials/*.html')
        .pipe(gulp.dest('./www/htmls/partials'));

    gulp.src('./dev/htmls/views/*.html')
        .pipe(gulp.dest('./www/htmls/views'));

    gulp.src('./dev/htmls/index.html')
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


gulp.task('default', ['browser-sync'], function() {
    gulp.watch(['dev/**/*'], ['dependencies', reload]);
    // gulp.watch(['gulpfile.js'], ['dependencies', reload]);
});



// execute:
// 1. clean
// 2. gulp dependencies

// 5. gulp default
