/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideAnimations} from '@angular/platform-browser/animations'
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr'


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideToastr(), 
    BrowserAnimationsModule,
  ],
}).catch((err) => console.error(err));