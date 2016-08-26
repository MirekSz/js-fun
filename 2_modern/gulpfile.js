var gulp = require('gulp'),
    notify = require('gulp-notify'),
    less = require('gulp-less');

gulp.task('less-to-css', function () {
    return gulp.src('./*.less')
        .pipe(less('./users.less', {style: 'expanded'}))
        .pipe(gulp.dest('./dist/css'))
        .pipe(notify({message: 'Less-to-css task complete'}));
});
