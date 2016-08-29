'use strict';

let gulp = require('gulp');
let notify = require('gulp-notify');
let less = require('gulp-less');
let through = require('through2');

gulp.task('less-to-css', function () {
    return gulp.src('./*.less')
        .pipe(through.obj((file, enc, callback) => {
            console.log(`Processing ${file.relative} file.`);
            callback(null, file);
        }))
        .pipe(less('./users.less', {style: 'expanded'}))
        .pipe(gulp.dest('./dist/css'))

        .pipe(notify({message: 'Less-to-css task complete'}));
});


