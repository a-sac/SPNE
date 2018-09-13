import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from './../tabs/tabs';
import { HomePage } from './../home/home';
import { KeyPage } from './../key/key';
import { HomeService } from '../../app/services/home.service';
import { Response } from '@angular/http';
import { MenuController } from 'ionic-angular';


@Component({
  selector: 'auth',
  templateUrl: 'auth.html'
})
export class AuthPage {

  constructor(public navCtrl: NavController, private storage: Storage, private homeService: HomeService, public alertCtrl: AlertController, public menu: MenuController) {
  
  }
  
  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
   }

  ngOnInit(){
    this.storage.get('key').then(pwd=> {
      if(pwd){
        this.storage.get('token').then(pwd2 => {
          if(pwd2){
            this.navCtrl.setRoot(HomePage,{
              storage: this.storage
            });
          }
        });
      }
    });
  }

  toggleCMD(){
    this.navCtrl.setRoot(KeyPage, {
    });
  }

  toggleQR(){

  }
}