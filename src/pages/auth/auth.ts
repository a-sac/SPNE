import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from './../tabs/tabs';
import { HomePage } from './../home/home';
import { KeyPage } from './../key/key';
import { EmailAdr } from './../emailadr/emailadr';
import { HomeService } from '../../app/services/home.service';
import { Response } from '@angular/http';
import { MenuController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import {Platform} from 'ionic-angular';

@Component({
  selector: 'auth',
  templateUrl: 'auth.html'
})
export class AuthPage {

  constructor(public platform: Platform, public navCtrl: NavController, private storage: Storage, private barcodeScanner: BarcodeScanner, private homeService: HomeService, public alertCtrl: AlertController, public menu: MenuController) {
  
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
            this.storage.get('adesao').then(pwd3 => {
              if(pwd3){
                this.navCtrl.setRoot(HomePage,{
                  storage: this.storage
                });
              } else{
                this.navCtrl.push(EmailAdr,{
                  storage: this.storage
                });
              }
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
      this.platform.ready().then(() => {
        this.barcodeScanner.scan().then((barcodeData) => {
          this.storage.set('key', 123);
          this.storage.set('token', 455204);
          this.navCtrl.push(EmailAdr,{
            storage: this.storage
          });
        }, (err) => {
          let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: err,
            buttons: ['Ok']
          });
          alert.present();
        })
      })
  }
}
