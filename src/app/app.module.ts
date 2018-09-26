import { HomePage } from './../pages/home/home';
import { SettingsPage } from './../pages/settings/settings';
import { TabsPage } from './../pages/tabs/tabs';
import { KeyPage } from './../pages/key/key';
import { SlidesPage } from './../pages/slides/slides';
import { IonicPageModule } from 'ionic-angular';
import { AuthPage } from './../pages/auth/auth';
import { Splash } from './../pages/splash/splash';
import { DetailsPage } from './../pages/details/details';
import { EmailAdr } from './../pages/emailadr/emailadr';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage'
import { Http, HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MyApp } from './app.component';
import { LockScreenPage } from '../pages/lock-screen/lock-screen';
import { PincodeInputModule } from 'ionic2-pincode-input';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import { Nav,MenuController } from 'ionic-angular';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { MaterialIconsModule } from 'ionic2-material-icons';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    LockScreenPage,
    HomePage,
    KeyPage,
    Splash,
    DetailsPage,
    SettingsPage,
    TabsPage,
    SlidesPage,
    AuthPage,
    EmailAdr
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    PincodeInputModule,
    HttpClientModule,
    HttpModule,
    NgxQRCodeModule,
    HttpClientModule,
    IonicPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    MaterialIconsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LockScreenPage,
    HomePage,
    KeyPage,
    DetailsPage,
    Splash,
    SettingsPage,
    TabsPage,
    SlidesPage,
    AuthPage,
    EmailAdr
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    FingerprintAIO,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
