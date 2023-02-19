'use strict';

const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const spritesmith = require('gulp.spritesmith');
const jade = require('gulp-jade');

const customOpts = {
  entries: ['./src/js/app.js'],
  debug: true
};
const opts = { ...watchify.args, ...customOpts };
const b = watchify(browserify(opts).transform(babelify.configure({ presets: ['@babel/preset-env', '@babel/preset-react'] })));

function bundle() {
  return b.bundle()
    .on('error', console.error.bind(console))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
}

gulp.task('js', bundle);

gulp.task('html', () => gulp.src('public/**/*.html').pipe(browserSync.stream()));

gulp.task('jade', () => gulp.src('src/jade/*.jade').pipe(jade({ pretty: true })).pipe(gulp.dest('public/jade')));

gulp.task('styles', () =>
  gulp
    .src('src/stylus/style.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({ compress: false }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream())
);

gulp.task('sprite', () =>
  gulp
    .src('./src/images/sprite/*.*')
    .pipe(
      spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.styl',
        cssFormat: 'stylus',
        algorithm: 'binary-tree',
        cssTemplate: 'stylus.template.mustache',
        cssVarMap: (sprite) => {
          sprite.name = `s-${sprite.name}`;
        }
      })
    )
    .pipe(gulp.dest('public/images'))
);

gulp.task('imagemin', () =>
  gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/images'))
);


gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });

  gulp.watch('src/stylus/**/*.styl', gulp.series('styles'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('public/**/*.html', gulp.series('html'));
});

gulp.task('default', gulp.parallel('jade', 'styles', 'sprite', 'imagemin', 'js', 'serve'));

