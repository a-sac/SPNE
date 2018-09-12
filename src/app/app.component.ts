import { LockScreenPage } from './../pages/lock-screen/lock-screen';
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Nav, IonicPage, MenuController } from 'ionic-angular';
import { Platform, ModalController, NavController } from 'ionic-angular';
import { Splash } from '../pages/splash/splash';
import { HomeService } from './services/home.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { QrCodePage } from '../pages/qrcode/qrcode';


@Component({
  templateUrl: 'app.html',
  providers: [HomeService]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any= LockScreenPage;
  tab1Root = HomePage;
  tab4Root = SettingsPage;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController, public menuCtrl: MenuController) {
    platform.ready().then(() => {
      /*
        if (PIN) {
          rootPage = HomePage;
          lockService.init();
        } else {
          rootPage = StartPage;
        }
        TIRAR O LOCKSERVICE DAQUI DE BAIXO
        */
      //lockService.init();
      statusBar.styleDefault();
      let splash = modalCtrl.create(Splash);
      splash.present();
      //splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'QR', component: QrCodePage },
      { title: 'Settings', component: SettingsPage }
    ];
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  openHome() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(HomePage);
    this.menuCtrl.close();
  }

  openSettings() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(SettingsPage);
    this.menuCtrl.close();
  }
}

