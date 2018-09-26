import { LockScreenPage } from './../pages/lock-screen/lock-screen';
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPageModule, NavParams } from 'ionic-angular';
import { Nav, IonicPage, MenuController } from 'ionic-angular';
import { Platform, ModalController, NavController } from 'ionic-angular';
import { Splash } from '../pages/splash/splash';
import { AnexosPage } from '../pages/anexos/anexos';
import { HomeService } from './services/home.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html',
  providers: [HomeService]
})

export class MyApp {
  rootPage: any = LockScreenPage;
  @ViewChild(Nav) nav: Nav;

  rootPageParams: any;

  pages: Array<{title: string, component: any}>;
  anexos: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private storage: Storage, public statusBar: StatusBar, public splashScreen: SplashScreen, public modalCtrl: ModalController, public menuCtrl: MenuController) {
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
      { title: 'Caixa de Entrada', component: HomePage },
      { title: 'Arquivo', component: HomePage },
      { title: 'Alertas', component: HomePage },
      { title: 'Definições', component: SettingsPage },
      { title: 'Sobre o PNE', component: HomePage },
    ];

    this.anexos = [
      { title: 'Autoridade Tributária', component: AnexosPage },
      { title: 'Plataforma de Notificações Eletrónicas', component: AnexosPage },
      { title: 'Primeiro Ministro', component: AnexosPage },
      { title: 'Segurança Social', component: AnexosPage },
      { title: 'Serviços de Estrangeiros e Fronteiras', component: AnexosPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
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
      this.statusBar.styleDefault();
      let splash = this.modalCtrl.create(Splash);
      splash.present();
      //splashScreen.hide();
    });
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, {storage: this.storage});

  }

  openAnexo(anexo) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(anexo.component, {storage: this.storage, entidade: anexo.title});

  }
}

