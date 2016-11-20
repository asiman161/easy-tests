import { enableProdMode, Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// depending on the env mode, enable prod mode or add debugging modules
if (process.env.ENV === 'production') {
  enableProdMode();
}




//noinspection TypeScriptValidateTypes
platformBrowserDynamic().bootstrapModule(AppModule);

