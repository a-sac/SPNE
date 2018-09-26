import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import { DetailsPage } from './../details/details';
import { Platform, AlertController } from 'ionic-angular';
import {  NavParams, LoadingController } from 'ionic-angular';
import { HomeService } from '../../app/services/home.service';
import { DomSanitizer } from '@angular/platform-browser';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";


@Component({
  selector: 'anexos',
  templateUrl: 'anexos.html'
})

export class AnexosPage {
  storage: any;
  key: any;
  token: any;
  loading: any;
  messages: any;
  date1: any;
  colors: any;
  anexos: any;

  constructor(public loadingCtrl: LoadingController, public plt: Platform, public navCtrl: NavController,
    public sanitizer: DomSanitizer, public navParams: NavParams, private homeService: HomeService, private alertCtrl: AlertController, private ffaio: FingerprintAIO) {
    this.storage = navParams.get('storage');
    this.colors={
      alerta : 'orange',
      notificacao : '#143363'
    };
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    this.messages = this.storage.get('mensagens');
    this.date1 = new Date(Date.parse(this.messages.data[0].validade[1]));
    var i = 0;
    this.messages.data.forEach(element => {
      if(element.entidade == navParams.get('entidade') && element['spne-local']=='arquivo'){
        this.anexos[i]=element;
      }
      i++;
    });
  }

  ngOnInit() {

    this.navParams.get('storage').get('key').then((val) => {
      this.key= val;
      this.navParams.get('storage').get('token').then((val2) => {
        this.token=val2;
              this.navParams.get('storage').get('users').then( users =>{if(users){
                this.loading.present();
                this.loading.dismiss();
              }
            });
          });
      });
  }

  ionViewDidLoad() {
    this.storage.get('first').then(bool => {
      if(bool) {
        console.log("First time")
        console.log(bool);
        this.faio();
      } else {
        console.log("NOT First time")
      }
    })
  }




  faio() {
    this.ffaio.isAvailable().then(result =>{
    if(result === "OK")
    {

      this.storage.set('first', false);
      let alert = this.alertCtrl.create({
        title: 'Touch ID',
        message: 'Deseja ativar o Touch ID?',
        buttons:[
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {
              console.log('Não clicked');
            }
          },
          {
            text: 'Sim',
            handler: () => {
              console.log('Sim clicked');
              this.storage.set('faio', true);
            }
          }
        ]
      })
      alert.present()


    }



    })

  }

  viewItem(item){
    this.navCtrl.push(DetailsPage, {
        item:item
    });
  }
}

