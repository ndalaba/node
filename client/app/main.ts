import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//import {enableProdMode} from '@angular/core'

import { AppModule } from './_modules/app.module';

//enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
