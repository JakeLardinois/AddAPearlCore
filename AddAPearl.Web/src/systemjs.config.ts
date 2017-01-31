/** Type declaration for ambient System. */
declare var System: any;

/**
 * System configuration for Angular 2
 */
((global) => {
	System.config({
		// map tells the System loader where to look for things
		map: {
			'@angular/common': 'npm:@angular/common/bundles/common.umd.js',
			'@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
			'@angular/core': 'npm:@angular/core/bundles/core.umd.js',
			'@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
			'@angular/http': 'npm:@angular/http/bundles/http.umd.js',
			'@angular/material': 'npm:@angular/material/bundles/material.umd.js',
			'@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
			'@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
			'@angular/router': 'npm:@angular/router/bundles/router.umd.js',
			'@vaadin/angular2-polymer': 'npm:@vaadin/angular2-polymer',
			'angular2-logger': 'npm:angular2-logger',
			'angular2-mdl': 'npm:angular2-mdl',
			'app': 'app',
			'fast-json-patch': 'npm:fast-json-patch/dist',
			'hammerjs': 'npm:hammerjs',
			'lodash': 'npm:lodash',
			'moment': 'npm:moment',
			'ng2-validation': 'npm:ng2-validation/dist',
			'rxjs': 'npm:rxjs',
		},
		// packages tells the System loader how to load when no filename and/or no extension
		packages: {
			'@vaadin/angular2-polymer': {
				defaultExtension: 'js',
				main: './index',
			},
			'angular2-logger': {
				defaultExtension: 'js',
			},
			'angular2-mdl': {
				main: 'bundle/angular2-mdl.js',
			},
			'app': {
				defaultExtension: 'js',
				main: './main.js',
			},
			'fast-json-patch': {
				defaultExtension: 'js',
				main: './json-patch-duplex.min',
			},
			'hammerjs': {
				defaultExtension: 'js',
				main: './hammer.min',
			},
			'lodash': {
				defaultExtension: 'js',
				main: './lodash',
			},
			'moment': {
				defaultExtension: 'js',
				main: './min/moment.min',
			},
			'ng2-validation': {
				defaultExtension: 'js',
				main: './index',
			},
			'rxjs': {
				defaultExtension: 'js',
			},
		},
		paths: {
			// paths serve as alias
			'npm:': 'lib/',
		},
	});
})(this);
