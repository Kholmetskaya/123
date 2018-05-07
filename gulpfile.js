/*
 * 
 * Определяем переменные 
 *
 */

var gulp = require('gulp'), 
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'), 
    htmlmin = require('gulp-htmlmin'),
    concat = require('gulp-concat'),
    less = require('gulp-less'); 
var webserver = require('gulp-webserver');
/*
 * 
 * Создаем задачи (таски) 
 *
 */

// Задача "css". Запускается командой "gulp css"
  gulp.task('css', function(){
	gulp.src(`./src/css/*.less`)
        .pipe(less())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(cleanCSS())
        .pipe(concat('index.css'))
		.pipe(gulp.dest('public/css'));
	
});
// Задача "js". Запускается командой "gulp js"
gulp.task('js', function() {
    gulp.src('./src/js/*') // файлы, которые обрабатываем
        .pipe(concat('index.js'))
        .pipe(uglify()) // минифицируем js      
        .pipe(gulp.dest('./public/js/')) // результат пишем по указанному адресу
});

// Задача "images". Запускается командой "gulp images"
gulp.task('img', function() {
   return gulp.src('./src/img/**/*') // берем любые файлы в папке и ее подпапках
        .pipe(imagemin()) // оптимизируем изображения для веба
        .pipe(gulp.dest('./public/img/')) // результат пишем по указанному адресу

});
// Задача "minify". Запускается командой "gulp minify"
gulp.task('minify', function() {
    return gulp.src('src/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('./public/'));
  });


// Задача "watch". Запускается командой "gulp watch"
// Она следит за изменениями файлов и автоматически запускает другие задачи
gulp.task('watch', function () {
	// При изменение файлов *.less в папке "css" и подпапках запускаем задачу css
	gulp.watch('./src/css/**/*.less', ['css']); 
	// При изменение файлов *.js папке "js" и подпапках запускаем задачу js
	gulp.watch('./src/js/**/*.js', ['js']);
	// При изменение любых файлов в папке "img" и подпапках запускаем задачу images
    gulp.watch('./src/img/**/*', ['img']);
    // При изменение любых html файлов  запускаем задачу minify
    gulp.watch('./src/*', ['minify']);

});
gulp.task('web-srv', function() {
    gulp.src('public')
        .pipe(webserver({
        fallback: 'index.html'
        }));
});
// Default Task
gulp.task('default', ['css', 'js', 'img', 'minify', 'watch', "web-srv"]);


