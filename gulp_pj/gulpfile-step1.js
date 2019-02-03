var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

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
   return gulp.src(path.scss)  // scss 폴더
  .pipe(sass())  // gulp-sass를 실행
  .pipe(gulp.dest(tmp.css)) // 결과 폴더
  .pipe(browserSync.reload({
    stream: true
  }))
});

// 변경사항을 실시간 반영
// watch task 수정
gulp.task('watch', ['sass','html', 'browserSync'],  function(){
  gulp.watch(path.scss, ['sass'])
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
  .pipe(gulp.dest(temp))
})

//http://localhost:3000/html/index.html


