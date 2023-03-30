import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {themeChange} from 'theme-change'


import {AppModule} from './app/app.module';

themeChange()
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
