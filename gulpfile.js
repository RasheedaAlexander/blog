var gulp = require('gulp');
var sass = require('gulp-sass'); // Requires the gulp-sass plugin
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();


gulp.task('sass', function(){
  gulp.watch('*.scss', ['sass'])

  return gulp.src('style.scss')
    .pipe(sourcemaps.init()) // Initialize sourcemap plugin
    .pipe(sass()) // Using gulp-sass
    .pipe(autoprefixer()) // Passes it through gulp-autoprefixer. Helps write vendor prefixes
    .pipe(sourcemaps.write()) // Writing sourcemaps
    .pipe(gulp.dest(''))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
   // must run watch after sass task to ensure CSS is most updated version
  gulp.watch('*.scss', ['sass']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('*.html', browserSync.reload); 
  gulp.watch('*.js', browserSync.reload); 
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})
// sourcemap is a string of information that tells the browser where different sections of the code is stored. With a CSS sourcemap, you can easily locate the original source code of specific lines of CSS just by checking out the inspector
