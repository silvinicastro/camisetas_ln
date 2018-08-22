let gulp = require('gulp');
let concat = require('gulp-concat');
let cleanCss = require('gulp-clean-css');
let browserSync = require('browser-sync');
let sourcemaps = require('gulp-sourcemaps');
let htmlmin = require('gulp-htmlmin');


gulp.task('minify', function () {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('build'));
});

gulp.task('styles', function () {
    return gulp.src([
        'src/css/reboot.css',
        'src/css/font.css',
        'src/css/style-resuelto.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('build/css/style.css'))
        .pipe(cleanCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.')) // cwd: current working directory
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('copy', function () {
    gulp.src('src/img/*')
        .pipe(gulp.dest('build/img/'));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: "build",
        port: 80
    });
});

gulp.task('watch', function () {
    gulp.watch('css/*.css', ['styles']); // detecta cambios en el directorio
    gulp.watch('*.html', browserSync.reload);
});

gulp.task('default', ['styles', 'browser-sync', 'watch', 'minify']);
