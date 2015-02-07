var gulp  = require('gulp');
var ect   = require('gulp-ect');
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');

// ect
gulp.task('ect', function(){
  gulp.src('src/**/*.ect')
  .pipe(ect({
    data: function (file, cb) {
      cb({
        filename: file,
        basepath: './'
      });
    }}))
  .pipe(gulp.dest('dist/'));
});

// .jsファイルと.vueファイルをwatch
gulp.task('watch', function() {
  gulp.watch(
    ['src/**/*.js', 'src/components/*.vue'], ['browserify'],
    ['src/*.ect', 'src/**/*.ect'], ['ect']
    );
});

// browserifyのタスクのtransformにdebowerifyとvueifyを指定する
gulp.task('browserify', function() {
    gulp.src('src/js/main.js')
        .pipe(browserify({transform: ["debowerify", "vueify"]}))
        .pipe(gulp.dest('dist/js'));
});

// watchして変更があったらビルドを実行するタスクの定義
gulp.task('default', function(){
    runSequence('browserify', 'ect' , 'watch');
});