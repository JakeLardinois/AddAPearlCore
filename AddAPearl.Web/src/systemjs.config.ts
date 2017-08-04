/** Type declaration for ambient System. */
declare var System: any;

/**
 * System configuration for Angular 2
 */
((global) => {
	System.config({
		// map tells the System loader where to look for things
		map: {
			'@angular-mdl/core': 'npm:@angular-mdl/core',
			'@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
			'@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
			'@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',
			'@angular/common': 'npm:@angular/common/bundles/common.umd.js',
			'@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
			'@angular/core': 'npm:@angular/core/bundles/core.umd.js',
			'@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
			'@angular/http': 'npm:@angular/http/bundles/http.umd.js',
			'@angular/material': 'npm:@angular/material/bundles/material.umd.js',
			'@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
			'@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
			'@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
			'@angular/router': 'npm:@angular/router/bundles/router.umd.js',
			'angular2-logger': 'npm:angular2-logger',
			'app': 'app',
			'fast-json-patch': 'npm:fast-json-patch/dist',
			'hammerjs': 'npm:hammerjs',
			'libphonenumber-js': 'npm:libphonenumber-js',
			'lodash': 'npm:lodash',
			'moment': 'npm:moment',
			'ng2-validation': 'npm:ng2-validation/bundles/ng2-validation.umd.js',
			'rxjs': 'npm:rxjs',
		},
		// packages tells the System loader how to load when no filename and/or no extension
		packages: {
			'@angular-mdl/core': {
				defaultExtension: 'js',
				main: 'bundle/core.js',
			},
			'angular2-logger': {
				defaultExtension: 'js',
			},
			'app': {
				defaultExtension: 'js',
				main: './main.js',
			},
			'fast-json-patch': {
				defaultExtension: 'js',
				main: './fast-json-patch.min',
			},
			'hammerjs': {
				defaultExtension: 'js',
				main: './hammer.min',
			},
			'libphonenumber-js': {
				defaultExtension: 'js',
				main: './bundle/libphonenumber-js.min',
			},
			'lodash': {
				defaultExtension: 'js',
				main: './lodash',
			},
			'moment': {
				defaultExtension: 'js',
				main: './min/moment.min',
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
