var gulp  = require('gulp');
var ect   = require('gulp-ect');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');

// 簡易サーバー
gulp.task('connect', function() {
  return connect.server({
    port: 3000,      // ポート番号を設定
    root: 'dist/',   // ルートディレクトリの場所を指定
    livereload: true // ライブリロードを有効にする
  });
});

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

// 開発用
gulp.task('serve', [
    'connect',
    'ect'
  ], function(){
  // 依存関係があるため、runSequenceで順序通りタスクを実行
  runSequence(
    'browserify',
    'watch'
  );
});

// watchして変更があったらビルドを実行するタスクの定義
gulp.task('default', function(){
    runSequence('browserify', 'ect' , 'watch');
});