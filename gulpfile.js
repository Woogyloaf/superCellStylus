var watchify      = require('watchify');
var browserify    = require('browserify');
var gulp          = require('gulp');
var source        = require('vinyl-source-stream');
var buffer        = require('vinyl-buffer');
var gutil         = require('gulp-util');
var babelify      = require('babelify');
var uglify        = require('gulp-uglify');
var sourcemaps    = require('gulp-sourcemaps');
var assign        = require('lodash.assign');
var browserSync   = require('browser-sync');
// var sass          = require('gulp-sass');
var spritesmith   = require('gulp.spritesmith');
var stylus        = require('gulp-stylus');
var imagemin      = require('gulp-imagemin');
var jade          = require('gulp-jade');

var autoprefixer  = require('gulp-autoprefixer');
var react         = require('react');
var reactDOM      = require('react-dom');



// ////////////////////////////////////////////////
// Javascript Browserify, Watchify, Babel, React
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md
// ////////////////////////////////////////////////

// add custom browserify options here
var customOpts = {
  entries: ['./src/js/app.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts)); 

// add transformations here
b.transform("babelify", {presets: ["es2015", "react"]});

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, gutil.colors.red(
       '\n\n*********************************** \n' +
      'BROWSERIFY ERROR:' +
      '\n*********************************** \n\n'
      )))
    .pipe(source('main.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    .pipe(uglify())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('../maps')) // writes .map file
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.reload({stream:true}));
}



// ////////////////////////////////////////////////
// Browser-Sync Tasks
// ////////////////////////////////////////////////

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./public/"
        }
    });
});



// ////////////////////////////////////////////////
// HTML Tasks
// ////////////////////////////////////////////////

gulp.task('html', function() {
  return gulp.src('public/**/*.html')
    .pipe(browserSync.reload({stream:true}));
});

// ////////////////////////////////////////////////
// Jade Tasks
// ////////////////////////////////////////////////
gulp.task('jade', function() {
  return gulp.src('src/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('public/jade'));
});

// ////////////////////////////////////////////////
// Styles Tasks SCSS
// ///////////////////////////////////////////////

// gulp.task('styles', function() {
//   gulp.src('src/scss/style.scss')
//     .pipe(sourcemaps.init())
//       .pipe(sass({outputStyle: 'compressed'}))
//       // .on('error', errorlog)
//       .on('error', gutil.log.bind(gutil, gutil.colors.red(
//          '\n\n*********************************** \n' +
//         'SASS ERROR:' +
//         '\n*********************************** \n\n'
//         )))
//       .pipe(autoprefixer({
//               browsers: ['last 3 versions'],
//               cascade: false
//           })) 
//     .pipe(sourcemaps.write('../maps'))
//     .pipe(gulp.dest('public/css'))
//     .pipe(browserSync.reload({stream:true}));
// });

// ////////////////////////////////////////////////
// Styles Tasks STYL
// ///////////////////////////////////////////////

gulp.task('styles', function() {
  gulp.src('src/stylus/style.styl')
    .pipe(sourcemaps.init())
       .pipe(stylus({compress: false })) 
       // .pipe(sass({outputStyle: 'compressed'}))
      // .on('error', errorlog)
      .on('error', gutil.log.bind(gutil, gutil.colors.red(
         '\n\n*********************************** \n' +
        'SASS ERROR:' +
        '\n*********************************** \n\n'
        )))
      .pipe(autoprefixer({
              browsers: ['last 3 versions'],
              cascade: false
          })) 
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({stream:true}));
});




// ////////////////////////////////////////////////
// Sprite Tasks
// ///////////////////////////////////////////////

gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('./src/images/sprite/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.styl',
                cssFormat: 'stylus',
                algorithm: 'binary-tree',
                cssTemplate: 'stylus.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('public/images/sprite')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('src/stylus/')); // путь, куда сохраняем стили
});

// ////////////////////////////////////////////////
// Image  Min Tasks
// ///////////////////////////////////////////////

gulp.task('imagemin', function () {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'))
});



// ////////////////////////////////////////////////
// Watch Tasks
// ////////////////////////////////////////////////

gulp.task('watch', function() {
  gulp.watch('public/**/*.html', ['html']);
  // gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/stylus/**/*.styl', ['styles']);
  gulp.watch('src/images/sprite/*', ['sprite']);
  gulp.watch('src/jade/**/*.jade', ['jade']);
  gulp.watch('src/images/*', ['imagemin']);
});


gulp.task('default', ['jade','sprite','imagemin','js', 'styles', 'browserSync', 'watch']);

