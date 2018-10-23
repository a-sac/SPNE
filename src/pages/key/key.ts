import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from './../tabs/tabs';
import { AuthPage } from './../auth/auth';
import { HomeService } from '../../app/services/home.service';
import { Response } from '@angular/http';
import { MenuController } from 'ionic-angular';
import { EmailAdr } from '../emailadr/emailadr';
import { HomePage } from '../home/home';


@Component({
  selector: 'key',
  templateUrl: 'key.html'
})
export class KeyPage {
  key: any;
  token: any;
  show: boolean;
  showT: boolean;
  item: any;
  error: any;

  constructor(public navCtrl: NavController, private storage: Storage, private homeService: HomeService, public alertCtrl: AlertController, public menuCtrl: MenuController) {
    this.show=false;
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

  ngOnInit(){
      this.storage.get('key').then(pwd=> {
        if(pwd){
          this.storage.get('token').then(pwd2 => {
            if(pwd2){
              this.storage.get('adesao').then(pwd3 => {
                if(pwd3){
                  console.log(pwd3);
                  this.navCtrl.setRoot(HomePage,{
                    storage: this.storage
                  });
                } else{
                  console.log("nao ha adesao");
                  this.navCtrl.push(EmailAdr,{
                    storage: this.storage
                  });
                }
              });
            }
            else{
              this.showT=true;
            }
          });
        }
        else{
          this.show=true;
        }
      });
  }

  toggleKey(){
    if(this.key != undefined){
      this.homeService.getTel(this.key)
      this.show=false;
      this.showT=true;
    }
  }

  toggleBC(){
    this.show=true;
    this.showT=false;
  }

  toggleBA(){
    this.navCtrl.setRoot(AuthPage, {
    });
  }

  toggleToken(){
    if((this.key != undefined) && (this.token != undefined)){
      var array = [];
      this.storage.set('key', this.key);
      this.storage.set('history', array);
      this.storage.set('token', this.token);
      this.navCtrl.push(EmailAdr,{
        storage: this.storage
      });
    }
  }
}
