import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from './../tabs/tabs';
import { AuthPage } from './../auth/auth';
import { HomeService } from '../../app/services/home.service';
import { Response } from '@angular/http';
import { MenuController } from 'ionic-angular';


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
              this.navCtrl.setRoot(TabsPage,{
                storage: this.storage
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
      this.homeService.getToken(this.key).subscribe(response => {
        this.error=response;
        console.log(response);
        if(this.error.status == "error"){
          let alert = this.alertCtrl.create({
            title: "ERRO",
            subTitle: "Chave única errada",
            buttons: [
              {
                text:'Ok',
                role: 'ok'
              }
          ]
          });
          alert.present();
        }
        else{
          this.show=false;
          this.showT=true;
        }
      });
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
      this.homeService.getPosts(this.key, this.token).subscribe(response => {
        this.item =response;
        console.log(this.item.status);
        if(this.item.status == "error"){
          let alert = this.alertCtrl.create({
            title: "ERRO",
            subTitle: "Token errado",
            buttons: [
              {
                text:'Ok',
                role: 'ok'
              }
          ]
          });
          alert.present();
        }
        else{
          var array = [];
          this.storage.set('key', this.key);
          this.storage.set('history', array);
          this.storage.set('token', this.token);
          this.navCtrl.setRoot(TabsPage,{
            storage: this.storage
          });
        }
        });
    }
  }
}
