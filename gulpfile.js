var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var inject = require('gulp-inject');
var clean = require('gulp-clean');


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



    //css
    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.css')
        .pipe(gulp.dest('./www/styles/'));

    gulp.src('./dev/styles/*.css')
        .pipe(gulp.dest('./www/styles/'));

    gulp.src('./bower_components/angular-chart.js/dist/angular-chart.css')
        .pipe(gulp.dest('./www/styles/'));




    //fonts 
    gulp.src('./bower_components/bootstrap/dist/fonts/*.*')
        .pipe(gulp.dest('./www/fonts/'));




    //images 
    gulp.src('./dev/images/*.*')
        .pipe(gulp.dest('./www/images/'));




    // htmls
    gulp.src('./dev/htmls/views/*.html')
        .pipe(gulp.dest('./www/views/'));

    gulp.src('./dev/htmls/index.html')
        .pipe(gulp.dest('./www/'));





});



// gulp.task('index-injected', function() {
//     gulp.src('./dev/htmls/index.html')
//         .pipe(gulp.dest('./www/'));
// });


// // inject
// gulp.task('inject', function() {
//     var target = gulp.src('./www/index.html');
//     var sources = gulp.src([
//         './www/scripts/jquery.js',
//         './www/scripts/bootstrap.js',
//         './www/styles/bootstrap.css',
//         './www/scripts/angular.js',
//         './www/scripts/angular-route.js',
//         './www/scripts/firebase.js',
//         './www/scripts/angularfire.js',
//         './www/scripts/config.js',
//         './www/scripts/firebase.ref.js',
//         './www/scripts/app.js',
//         './www/scripts/controllers.js'
//     ], {
//         read: false
//     });

//     return target.pipe(inject(sources, { relative: true }))
//         .pipe(gulp.dest('./www/'));

// });


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

// 3. gulp index-injected
// 4. gulp inject

// 5. gulp default
