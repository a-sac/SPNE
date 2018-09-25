import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { KeyPage } from './../key/key';
import { HomeService } from '../../app/services/home.service';
import { TabsPage } from './../tabs/tabs';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { AuthPage } from '../auth/auth';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'emailadr',
  templateUrl: 'emailadr.html'
})
export class EmailAdr {
  show: any;
  showEA: any;
  showEAT: any;
  showTEL: any;
  showTELT: any;
  ea: any;
  eac: any;
  eat: any;
  tel: any;
  telc: any;
  telt: any;
  user: any;

  constructor(public navCtrl: NavController, private storage: Storage, private homeService: HomeService, public alertCtrl: AlertController) {
    this.show= true;
    this.showEA= false;
    this.showEAT= false;
    this.showTEL= false;
    this.showTELT= false;
    this.user={
      "email": "victor.fonte@gmail.com",
      "fotografia": null,
      "nome": "V\u00edtor Francisco Fonte",
      "telemovel": "+351913456202",
      "uid": "000000001",
      "cc": "12356789"
    };
    this.ea = this.user.email;
    this.eac = this.user.email;
    this.tel = this.user.telemovel;
    this.telc = this.user.telemovel;
  }
  
  entrar(){
    this.show=false;
    this.showEA=true;
  }

  toggleEA(){
    if(this.ea!=undefined && this.eac!=undefined && this.ea!=null && this.eac!=null && this.ea==this.eac){
      this.showEA=false;
      this.showEAT=true;
    }
  }

  toggleEAT(){
    if(this.eat!=undefined && this.eat!=null){
      this.showEAT=false;
      this.showTEL=true;
    }
  }

  toggleTEL(){
    if(this.tel!=undefined && this.telc!=undefined && this.tel!=null && this.telc!=null && this.tel==this.telc){
      this.showTEL=false;
      this.showTELT=true;
    }
  }

  toggleTELT(){
    if(this.telt!=undefined && this.telt!=null){
      this.storage.set('adesao', "aderiu");
      this.navCtrl.setRoot(HomePage,{
        storage: this.storage
      });
    }
  }
  
}
