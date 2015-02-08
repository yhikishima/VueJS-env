var gulp  = require('gulp');
var ect   = require('gulp-ect');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');
var browserify = require('gulp-browserify');
var load = require('gulp-load-plugins');

//---------------------
// タスクの定義
//---------------------
// 簡易サーバー
gulp.task('connect', function() {
  return connect.server({
    port: 3000,      // ポート番号を設定
    root: 'dist/',   // ルートディレクトリの場所を指定
    livereload: true // ライブリロードを有効にする
  });
});

// 自動更新
gulp.task("reload", function() {
  gulp.src([
    'dist/{,**/}*'
    ])
  .pipe(connect.reload());
});

// ect
gulp.task('ect', function(){
  gulp.src('src/{,**/}*.ect')
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
    ['src/js/{,**/}*.js', 'src/js/{,**/}*.vue', 'src/stylus/{,**/}*.styl'],
    ['browserify']
  );

  gulp.watch([
    'src/{,**/}*.ect'
    ],['ect']
  );

  gulp.watch([
    'dist/{,**/}*'
    ],['reload']
  );
});

// browserifyのタスクのtransformにdebowerifyとvueifyを指定する
gulp.task('browserify', function() {
  gulp.src('src/js/main.js')
    .pipe(browserify({transform: [
      "debowerify",
      "vueify"
    ]}))
    .pipe(gulp.dest('dist/js'));
});

//---------------------
// タスクの実行
//---------------------

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
