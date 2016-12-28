var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  clean = require('gulp-clean'),
  less = require('gulp-less'),
  concat = require('gulp-concat');



//Clean WWW Folder 
gulp.task('clean', function() {
  return gulp.src('./www/', { read: false })
    .pipe(clean());
});

// WWW Folder
gulp.task('dependencies', function() {

  // app
  gulp.src('./dev/scripts/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./www/scripts/'));


  // scripts
  gulp.src([
      './node_modules/jquery/dist/jquery.js',
      './node_modules/bootstrap/dist/js/bootstrap.js',
      './node_modules/angular/angular.js',
      './node_modules/angular-route/angular-route.js',
      './node_modules/firebase/firebase.js',
      './node_modules/angularfire/dist/angularfire.js',
      './node_modules/chart.js/dist/Chart.js',
      './node_modules/angular-chart.js/dist/angular-chart.js',
      './node_modules/angular-hotkeys/build/hotkeys.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./www/scripts/'));


  //css
  gulp.src(['./dev/styles/angular-chart.css', './node_modules/angular-hotkeys/build/hotkeys.css'])
    .pipe(gulp.dest('./www/styles/'));

  gulp.src(['./dev/styles/*.less', './dev/styles/bootstrap/bootstrap.less'])
    .pipe(less())
    .pipe(gulp.dest('./www/styles/'));


  //fonts 
  gulp.src('./node_modules/bootstrap/dist/fonts/*.*')
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
    },
    open: false
  });
});


gulp.task('default', ['browser-sync'], function() {
  gulp.watch(['dev/**/*'], ['dependencies', reload]);
  // gulp.watch(['gulpfile.js'], ['dependencies', reload]);
});


// execute:
// 1. clean
// 2. gulp dependencies
// 3. gulp default
// gulp clean && gulp dependencies && gulp