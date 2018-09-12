import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { KeyPage } from './../key/key';
import { HomeService } from '../../app/services/home.service';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AuthPage } from '../auth/auth';
import { MenuController } from 'ionic-angular';


@Component({
  selector: 'slides',
  templateUrl: 'slides.html'
})
export class SlidesPage {
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, private storage: Storage, private homeService: HomeService, public alertCtrl: AlertController, public menuCtrl: MenuController) {
    
  }

  ionViewDidEnter() {
    this.menuCtrl.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menuCtrl.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
   }

  goToSlide() {
    this.slides.slideTo(2, 500);
  }

  entrar(){
    this.navCtrl.setRoot(AuthPage, {
    });
  }
  
}
