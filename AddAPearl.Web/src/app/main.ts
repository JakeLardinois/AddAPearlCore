// main entry point
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { webcomponentsReady } from '@codebakery/origami';
import { AppModule } from './app.module';

//platformBrowserDynamic().bootstrapModule(AppModule);

webcomponentsReady().then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule, {
      enableLegacyTemplate: false
    });
  }).catch(error => {
    // No WebComponent support and webcomponentsjs is not loaded
    console.error(error);
  });