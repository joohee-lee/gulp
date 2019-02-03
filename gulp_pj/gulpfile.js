var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
// runSequence 사용을 위한 변수 정의
var runSequence = require('run-sequence');
var fileinclude = require('gulp-file-include'); // 추가


//build add
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var del = require('del');



gulp.task('default', function(){
	console.log("start ! v3.9");
});

//폴더정의 
var src = 'ui'; //작업폴더 
var dist = 'dist'; // 배포를 위한 파일 저장 폴더 ( 폴더 생성 불필요 ) 
var temp = 'tmp';  // 임시저장 폴더 ( 폴더 생성 불필요 ) 

var path = {
	scss: src + '/common/scss/**/*.scss',
	js: src + '/common/js/**/*.js',
	html: src + '/**/*.html',
	img: src + '/**/*.+(png|jpg|jpeg|gif|svg)',
  fonts: src + '/common/fonts/**/*.+(eot|woff|woff2|ttf|svg)',
  icon: src + '/common/icon/**/*.+(eot|woff|woff2|ttf|svg)',
  inc: src + '/**/*.inc'
};

// 임시 저장 폴더 (tmp 폴더는 임시 저장을 위한 폴더로 자동으로 생성)
var tmp = {
  css: temp + '/common/css',
  js: temp + '/common/js',
  fonts: temp + '/common/fonts',
  html: temp + '/**/*.html'
};

//gulp-sass
// task 순서 : sourcemap 생성 > sass 실행 > sourcemap 표시 > dest로 복사 > browser reload
gulp.task('sass', function(){
   return gulp.src(path.scss)
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write('.',{includeContent: true}))
  .pipe(gulp.dest(tmp.css))
  .pipe(browserSync.reload({
    stream: true
  }))
});

// 변경사항을 실시간 반영
// watch task 수정
/*
gulp.task('watch', ['sass','html', 'browserSync'],  function(){
  gulp.watch(path.scss, ['sass'])
  gulp.watch(path.html, ['html', browserSync.reload]);
});
*/

// watch task 수정
gulp.task('watch',  function(){
  gulp.watch(path.scss, ['sass'])
  gulp.watch(path.js, ['copyJs', browserSync.reload]);
  gulp.watch(path.img, ['copyImg', browserSync.reload]);
  gulp.watch(path.html, ['html', browserSync.reload]);
});

// 서버 실행
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: temp // 기준 경로를 temp(tmp) 로 설정
    }
  })
});

// html copy 추가
gulp.task('html', function(){
  return gulp.src(path.html)
  .pipe(fileinclude({
      prefix: '@@',
      basepath: src
  }))
  .pipe(gulp.dest(temp))
})

// js copy 추가
gulp.task('copyJs', function(){
  return gulp.src(path.js)
  .pipe(gulp.dest(tmp.js))
});
 
// img copy 추가
gulp.task('copyImg', function(){
  return gulp.src(path.img)
  .pipe(gulp.dest(temp))
});

// img build
gulp.task('buildImg', function() {
  return gulp.src(path.img)
  .pipe(gulp.dest(dist))
});


// useref task 추가
gulp.task('useref', function(){
  return gulp.src(tmp.html)
    .pipe(useref({searchPath:temp}))  // 파일 통합의 기준은 temp 폴더를 기준으로
    .pipe(gulpIf('*.js', uglify()))   // js 파일의 경우 uglify
    .pipe(gulpIf('*.css', cssnano())) // css 파일은 cssnano 로 압축하여 
    .pipe(gulp.dest(dist))  // dist 폴더로 이동
});

// clean
gulp.task('clean:dist', function() {  
  return del.sync(dist);
});


//default 정의
gulp.task('default', function (callback) {
  runSequence(['sass', 'copyJs', 'html', 'watch', 'copyImg'],'browserSync',
    callback
  );
});


// build 
gulp.task('build', function(callback) {
  runSequence('clean:dist', 'sass',['copyJs','html', 'buildImg'], 'useref',
    callback
  );
});


//http://localhost:3000/html/index.html


