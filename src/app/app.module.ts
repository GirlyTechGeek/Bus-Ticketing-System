import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {IonicStorageModule} from '@ionic/storage';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BnNgIdleService} from 'bn-ng-idle';
import {Storage} from '@ionic/storage';
import {DatePipe} from '@angular/common';
import {Angular4PaystackModule} from 'angular4-paystack';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    Angular4PaystackModule.forRoot('pk_test_c7639e0fbb1670f2fac51d45e629214990577f25'),
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //     enabled: environment.production
    // }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BnNgIdleService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
