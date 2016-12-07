const gulp = require('gulp');
const del = require('del');
const config = require('./gulp.config')();
const path = require('path');
const $ = require('gulp-load-plugins')({ lazy: true });
var tsProject = $.typescript.createProject('tsconfig.json');

/* Remove build directory.*/
gulp.task('clean', (cb:any) => {
    Log('Cleaning the build directory...');
    return del(['build'], cb);
});

gulp.task('sass', () => {
    Log('Compiling the SCSS files into the build directory...');
	return gulp.src(config.client.sass)
        .pipe($.plumber())
		.pipe($.sass())
		.pipe($.rename(function(file:any) {
			file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
		}))
		.pipe(gulp.dest('./build'));
});

gulp.task('tslint', () => {
    Log('Linting the typescript files...');
    return gulp.src(config.client.ts)
        .pipe($.tslint({
            formatter: 'verbose'
        }))
        .pipe($.tslint.report({
            emitError: false,
            summarizeFailureOutput: true
        }));
});

gulp.task('compile', ['tslint'], () => {
    Log('Compiling all typescript files into the build directory...');
    let tsResult = tsProject.src()
        .pipe($.sourcemaps.init())
        .pipe(tsProject($.typescript.reporter.longReporter()));
    return tsResult.js
        .pipe($.sourcemaps.write('.', {sourceRoot: '/src'}))
        .pipe(gulp.dest('build'));
});

gulp.task('source', () => {
    Log('Copying all source files into the build/src directory...');
    return gulp.src(config.client.all)
        .pipe(gulp.dest('build/src'))
});

/*Copy all resources that are not TypeScript or SCSS files into build directory.*/
gulp.task('resources', () => {
    Log('Copying all compiled files into the build directory...');
    return gulp.src([config.client.all, '!**/*.ts', '!**/*.scss'])
        .pipe(gulp.dest('build'));
});

/*Copy all required libraries into build/lib directory.*/
gulp.task('libs', () => {
    Log('Copying all required libraries into build/lib directory...');
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**/*.js',
            'zone.js/dist/**',
            '@angular/**/bundles/**',
            '@angular/material/**/*'
        ], {cwd: 'node_modules/**'}) /* Glob required here. */
        .pipe(gulp.dest('build/lib'));
});

/*Add watch rules*/
gulp.task('watch', () => {
	Log('Adding watch rules...');
    gulp.watch(config.client.ts, ['compile', 'source'])
        .on('change', changeEvent);
    gulp.watch([config.client.html, config.client.css], ['resources'])
        .on('change', changeEvent);
    gulp.watch(config.client.sass, ['sass'])
        .on('change', changeEvent);
});

gulp.task('build-prod', ['compile', 'sass', 'resources', 'libs'], () => {
    Log('Built the production project!');
});

gulp.task('build-dev', ['compile', 'sass', 'source', 'resources', 'libs'], () => {
    Log('Built the development project!');
});

function changeEvent(event:any) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    Log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function Log(msg:any) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}