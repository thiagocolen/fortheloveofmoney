var gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  clean = require('gulp-clean'),
  less = require('gulp-less'),
  concat = require('gulp-concat');


// Clean WWW Folder 
gulp.task('clean', function() {
  return gulp.src('./build/', { read: false })
    .pipe(clean());
});


// WWW Folder
gulp.task('dependencies', function() {

  // app
  gulp.src('./src/client/app/**/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./build/assets/scripts/'));


  // scripts
  gulp.src([
      './node_modules/jquery/dist/jquery.js',
      './node_modules/bootstrap/dist/js/bootstrap.js',
      './node_modules/angular/angular.js',
      './node_modules/angular-route/angular-route.js',
      './node_modules/angular-local-storage/dist/angular-local-storage.js',
      './node_modules/firebase/firebase.js',
      './node_modules/angularfire/dist/angularfire.js',
      './node_modules/chart.js/Chart.js',
      './node_modules/angular-chart.js/dist/angular-chart.js',
      './node_modules/angular-hotkeys/build/hotkeys.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./build/assets/scripts/'));


  //css
  gulp.src(['./src/client/assets/styles/angular-chart.css', './node_modules/angular-hotkeys/build/hotkeys.css'])
    .pipe(gulp.dest('./build/assets/styles/'));

  gulp.src(['./src/client/assets/styles/*.less', './src/client/assets/styles/bootstrap/bootstrap.less'])
    .pipe(less())
    .pipe(gulp.dest('./build/assets/styles/'));


  //fonts 
  gulp.src('./node_modules/bootstrap/dist/fonts/*.*')
    .pipe(gulp.dest('./build/assets/fonts/'));


  //images 
  gulp.src('./src/client/assets/images/*.*')
    .pipe(gulp.dest('./build/assets/images/'));


  // htmls
  gulp.src('./src/client/app/**/*.html')
    .pipe(gulp.dest('./build/assets/htmls/'));

  gulp.src('./src/client/index.html')
    .pipe(gulp.dest('./build/'));


});



// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./build/"
    },
    open: false
  });
});


gulp.task('default', ['browser-sync'], function() {
  gulp.watch(['./src/client/**/*'], ['dependencies', reload]);
  // gulp.watch(['gulpfile.js'], ['dependencies', reload]);
});


// execute:
// 1. clean
// 2. gulp dependencies
// 3. gulp default
// gulp clean && gulp dependencies && gulp
