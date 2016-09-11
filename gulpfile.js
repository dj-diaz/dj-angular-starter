var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    series = require('stream-series');

var src = "./app";

gulp.task('scripts', function () {
    return gulp.src('app/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('app/build/js'));
});

gulp.task('scripts:min', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('app/build/js'));
});

gulp.task('inject', function() {
    var vendorStream = gulp.src(['./app/components/**/*.min.js', './app/components/**/*.css'], {read: false});

    var appStream = gulp.src(['./app/*.js','./app/js/**/*.js', './app/js/**/*.css'], {read: false});

    return gulp.src('./app/index.html')
        .pipe(inject(series(vendorStream, appStream)))   
        .pipe(gulp.dest('./app'));
});


gulp.task('watch', function() {
    gulp.watch(src + 'js/*.js', ['inject']);
});


gulp.task('default', ['inject', 'watch']);