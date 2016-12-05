const gulp = require('gulp');
const del = require("del");
const config = require('./gulp.config')();
const path = require('path');
const $ = require('gulp-load-plugins')({ lazy: true });
var tsProject = $.typescript.createProject("tsconfig.json");


/* Remove build directory.*/
gulp.task('clean', (cb:any) => {
    return del(["build"], cb);
});

gulp.task('sass', function() {
	return gulp.src(config.client.sass)
        .pipe($.plumber())
		.pipe($.sass())
		.pipe($.rename(function(file:any) {
			file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
		}))
		.pipe(gulp.dest('./build'));
});

gulp.task('tslint', () => {
    return gulp.src(config.client.ts)
        .pipe($.tslint({
            formatter: 'verbose'
        }))
        .pipe($.tslint.report({
            emitError: false,
            summarizeFailureOutput: true
        }));
});

gulp.task("compile", () => {
    
    let tsResult = gulp.src(config.client.ts)
        .pipe($.sourcemaps.init())
        .pipe(tsProject($.typescript.reporter.longReporter()));
    return tsResult.js
        .pipe($.sourcemaps.write(".", {sourceRoot: '/src'}))
        .pipe(gulp.dest("build"));
});

/*Copy all resources that are not TypeScript files into build directory.*/
gulp.task("resources", () => {
    return gulp.src([config.client.all, "!**/*.ts", "!**/*.scss"])
        .pipe(gulp.dest("build"));
});

/*Copy all required libraries into build directory.*/
gulp.task("libs", () => {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**/*.js',
            'zone.js/dist/**',
            '@angular/**/bundles/**',
            '@angular/material/**/*'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});

gulp.task('watch', function() {
	// Add watch rules
    gulp.watch(config.client.ts, ['compile'])
        .on('change', changeEvent);
    gulp.watch([config.client.html, config.client.css], ['resources'])
        .on('change', changeEvent);
    gulp.watch(config.client.sass, ['sass'])
        .on('change', changeEvent);
});

gulp.task("build", ['compile', 'sass', 'resources', 'libs'], () => {
    Log("Building the project ...");
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