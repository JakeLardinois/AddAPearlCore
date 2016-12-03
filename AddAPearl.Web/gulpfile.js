var gulp = require('gulp');
var config = require('./gulp.config')();
var path = require('path');
//var gulpPlumber = require('gulp-plumber')
var $ = require('gulp-load-plugins')({ lazy: true });


gulp.task('sass', function() {
	return gulp.src(config.client.sass)
		//.pipe(gulpPlumber())
        .pipe($.plumber())
		.pipe($.sass())
		.pipe($.rename(function(file) {
			file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
		}))
		.pipe(gulp.dest('./app'));
});
