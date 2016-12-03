import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Http } from 'angular2/http';

import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { Demands } from '../pages/demands/demands';
import { Delivery } from '../pages/delivery/delivery';

import { LocationTracker } from '../providers/location-tracker';

@NgModule({
  declarations: [
    MyApp,
    Login,
    Demands,
    Delivery
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Demands,
    Delivery
  ],
  providers: [LocationTracker]
})
export class AppModule {}
