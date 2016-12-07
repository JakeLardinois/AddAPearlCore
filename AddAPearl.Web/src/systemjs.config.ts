/** Type declaration for ambient System. */
declare var System: any;

/**
 * System configuration for Angular 2
 */
((global) => {
  System.config({
    // map tells the System loader where to look for things
    map: {
      // angular bundles
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/material': 'npm:@angular/material/material.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',

      // other libraries
      'rxjs': 'npm:rxjs',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        defaultExtension: 'js',
        main: './main.js',
      },
      rxjs: {
        defaultExtension: 'js',
      },
    },
    paths: {
      // paths serve as alias
      'npm:': 'lib/',
    },
  });
})(this);
