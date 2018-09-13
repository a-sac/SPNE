import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { MenuController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab4Root = SettingsPage;
  tabParams = {
    storage: this.navParams.get('storage')
  }

  constructor(public navParams: NavParams, public menuCtrl: MenuController) {
  }

  openMenu() {
    this.menuCtrl.open();
  }
}
