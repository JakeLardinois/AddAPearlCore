const gulp = require('gulp');
const del = require('del');
const wiredep = require('wiredep');
const runSequence = require('run-sequence');
const config = require('./gulp.config')();
const path = require('path');
const $ = require('gulp-load-plugins')({ lazy: true });
var tsProject = $.typescript.createProject('tsconfig.json');


// When the user enters "gulp" on the command line, the default task will automatically be called.
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

/* Remove build directory.*/
gulp.task('clean', (cb:any) => {
    return del(['build'], cb);
});

gulp.task('processBower', (cb:any) => {
    runSequence(['bowerScripts', 'bowerCss', 'bowerFiles'], 'indexBower', cb);
});

//Bower file collection
gulp.task('bowerScripts', (cb:any) => {
    var bowerJs = wiredep().js;
    
    if(bowerJs && bowerJs.length > 0) { // 'Invalid glob argument' error is thrown by gulp.src if there are no bower scripts
        return gulp.src(bowerJs)
            .pipe($.debug({title: 'BowerJavaScript:'}))
            .pipe($.concat('vendor.min.js'))
            .pipe($.rev())
            .pipe($.uglify({
                mangle: false
            }))
            .pipe(gulp.dest('./build/bower'))
            .pipe($.debug({title: 'ConcantenatedBowerJavaScript:'}));
    } else {
        Log('No Bower scripts!');
        cb();
        return;
    }
});

gulp.task('bowerCss', (cb:any) => {
    var bowerCss = wiredep().css;

    if(bowerCss && bowerCss.length > 0) { // 'Invalid glob argument' error is thrown by gulp.src if there is no bower css
        return gulp.src(bowerCss)
            .pipe($.debug({title: 'BowerCss:'}))
            .pipe($.cssmin())
            .pipe($.concat('vendor.min.css'))
            .pipe($.rev())
            .pipe(gulp.dest('./build/bower'))
            .pipe($.debug({title: 'ConcantenatedBowerCss:'}));
    } else {
        Log('No Bower css!');
        cb();
        return;
    }
});

//inject ALL Bower js & css links into index.html
gulp.task('indexAllBower', () => {
    var bowerJsFiles = ['build/bower/**/*.js'];
    var bowerCssFiles = ['build/bower/**/*.css'];

    return gulp.src('src/index.html')

        .pipe($.inject(
            gulp.src(bowerJsFiles, {
                read: false
            }), {
                addRootSlash: false,
                transform: (filePath:any, file:any, i:any, length:any) => {
                    return '<script src="' + filePath.replace('build/', '') + '"></script>';
                }
            }))

        .pipe($.inject(
            gulp.src(bowerCssFiles, {
                read: false
            }), {
                addRootSlash: false,
                transform: (filePath:any, file:any, i:any, length:any) => {
                    return '<link rel="stylesheet" href="' + filePath.replace('build/', '') + '"/>';
                }
            }))
        .pipe(gulp.dest('build'));
});

//inject ONLY concantenated and minified Bower js & css links into index.html
gulp.task('indexBower', () => {
    var bowerJsFiles = ['build/bower/vendor-*.min.js'];
    var bowerCssFiles = ['build/bower/vendor-*.min.css'];

    return gulp.src('src/index.html')

        .pipe($.inject(
            gulp.src(bowerJsFiles, {
                read: false
            }), {
                addRootSlash: false,
                transform: (filePath:any, file:any, i:any, length:any) => {
                    return '<script src="' + filePath.replace('build/', '') + '"></script>';
                }
            }))

        .pipe($.inject(
            gulp.src(bowerCssFiles, {
                read: false
            }), {
                addRootSlash: false,
                transform: (filePath:any, file:any, i:any, length:any) => {
                    return '<link rel="stylesheet" href="' + filePath.replace('build/', '') + '"/>';
                }
            }))
        .pipe(gulp.dest('build'));
});

/*This task gets all the Bower js, css and html files (For all Polymer Elements) using gulp source and copies them into a directory */
gulp.task('bowerFiles', function() {
    return gulp.src(['bower_components/**/*.js', 'bower_components/**/*.css', 'bower_components/**/*.html'])
        .pipe($.debug({title: 'BowerFiles:'}))
        .pipe(gulp.dest('./build/bower'));
});

/*Uses gulp-main-bower-files plugin to copy all necessary files specified in bower.json into a directory.  I had problems with it getting all the files 
* that the application required (because Bower is used here mainly for Polymer Elements) and so I had to use the override option.*/
gulp.task('main-bower-files', function() {
    return gulp.src('./bower.json')
        .pipe($.mainBowerFiles({
            overrides: {
            }
        }))
        .pipe($.debug({title: 'BowerFiles:'}))
        .pipe(gulp.dest('./build/bower'));
});

/*Compile the SCSS files into the build directory*/
gulp.task('sass', () => {
	return gulp.src(config.client.sass)
        .pipe($.plumber())
		.pipe($.sass())
		.pipe($.rename(function(file:any) {
			file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
		}))
		.pipe(gulp.dest('./build'));
});

/*Lint the typescript files*/
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

/*Compile all typescript files into the build directory*/
gulp.task('compile', ['tslint'], () => {
    let tsResult = tsProject.src()
        .pipe($.sourcemaps.init())
        .pipe(tsProject($.typescript.reporter.longReporter()));
    return tsResult.js
        .pipe($.sourcemaps.write('.', {sourceRoot: '/src'}))
        .pipe(gulp.dest('build'));
});

/*Copy all source files into the build/src directory*/
gulp.task('source', () => {
    return gulp.src(config.client.all)
        .pipe(gulp.dest('build/src'))
});

/*Copy all source typescript files into the build/src directory*/
gulp.task('source-typescript', () => {
    return gulp.src(config.client.ts)
        .pipe(gulp.dest('build/src'))
});

/*Copy all source SCSS files into the build/src directory*/
gulp.task('source-sass', () => {
    return gulp.src(config.client.sass)
        .pipe(gulp.dest('build/src'))
});

/*Copy all source html files into the build directory*/
gulp.task('source-html', () => {
    return gulp.src(config.client.html)
        .pipe(gulp.dest('build'))
});

/*Copy all source html files into the build directory and then modify index.html to include the bower scripts and css*/
gulp.task('processHtml', (cb:any) => {
    runSequence(['source-html'], 'indexBower', cb);
});

/*Copy all resources that are not TypeScript or SCSS files into build directory.*/
gulp.task('resources', () => {
    return gulp.src([config.client.all, '!**/*.ts', '!**/*.scss'])
        .pipe(gulp.dest('build'));
});

/*Copy all required libraries into build/lib directory.*/
gulp.task('libs', () => {
    return gulp.src([
            'core-js/client/shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'hammerjs/hammer.min.js',
            'rxjs/**/*.js',
            'zone.js/dist/**',
            'fast-json-patch/dist/**',
            '@angular/**/bundles/**',
            '@angular-mdl/core/bundle/core.js',
            '@angular/material/**/*',
            'ng2-validation/**/*.js',
            'lodash/**/*.js',
            'angular2-logger/**/*.js',
            '@vaadin/**/*.js',
            'moment/min/*.js',
            'libphonenumber-js/bundle/*.js',
            '@codebakery/origami/bundles/*.js'
        ], {cwd: 'node_modules/**'}) /* Glob required here. */
        .pipe(gulp.dest('build/lib'));
});

/*Add watch rules*/
gulp.task('watch', () => {
    gulp.watch(config.client.ts, ['compile', 'source-typescript'])
        .on('change', changeEvent);
    gulp.watch([config.client.html], ['processHtml'])
        .on('change', changeEvent);
    gulp.watch(config.client.sass, ['sass', 'source-sass'])
        .on('change', changeEvent);
});

gulp.task('build-prod', ['compile', 'sass', 'resources', 'libs', 'processBower'], (cb:any) => {
    Log('Built the production project!');
});

gulp.task('build-dev', ['compile', 'sass', 'source', 'resources', 'libs', 'processBower'], (cb:any) => {
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