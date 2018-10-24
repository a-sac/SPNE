import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import { DetailsPage } from './../details/details';
import { AnexosPage } from './../anexos/anexos';
import { Platform, AlertController } from 'ionic-angular';
import {  NavParams, LoadingController } from 'ionic-angular';
import { HomeService } from '../../app/services/home.service';
import { DomSanitizer } from '@angular/platform-browser';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  [x: string]: any;
  storage: any;
  key: any;
  token: any;
  loading: any;
  messages: any;
  date1: any;
  colors: any;
  user: any;
  usersel: any;
  arquivos: any;
  at: any;
  pne: any;
  pm: any;
  ss: any;
  sef: any;

  constructor(public loadingCtrl: LoadingController, public plt: Platform, public navCtrl: NavController,
    public sanitizer: DomSanitizer, public navParams: NavParams, private homeService: HomeService, private alertCtrl: AlertController, private ffaio: FingerprintAIO) {
    this.storage = navParams.get('storage');
    this.colors={
      alerta : 'orange',
      notificacao : '#143363'
    };
    this.at=0;
    this.pne=0;
    this.pm=0;
    this.ss=0;
    this.sef=0;
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    this.storage.get('mensagens').then((value) => {
      console.log(value)
      if(value){
        this.messages=value;
        this.date1 = new Date(Date.parse(value.data[0].validade[1]))
        this.messages.data.forEach(element => {
          if(element['entidade']=='Autoridade Tributária' && element['spne-local']=='arquivo'){
            this.at++;
          }
          if(element['entidade']=='Plataforma de Notificações Eletrónicas' && element['spne-local']=='arquivo'){
            this.pne++;
          }
          if(element['entidade']=='Primeiro Ministro' && element['spne-local']=='arquivo'){
            this.pm++;
          }
          if(element['entidade']=='Segurança Social' && element['spne-local']=='arquivo'){
            this.ss++;
          }
          if(element['entidade']=='Serviços de Estrangeiros e Fronteiras' && element['spne-local']=='arquivo'){
            this.sef++;
          }
        });
      }
    }, (reason) => {
      console.log(reason)
    });
    this.usersel="user";
    this.user={
      "email": "victor.fonte@gmail.com",
      "fotografia": null,
      "nome": "V\u00edtor Francisco Fonte",
      "telemovel": "+351913456202",
      "uid": "000000001",
      "cc": "12356789"
    };
    this.usersel=this.user.nome;
    this.arquivos = [
      { title: 'Autoridade Tributária', component: AnexosPage },
      { title: 'Plataforma de Notificações Eletrónicas', component: AnexosPage },
      { title: 'Primeiro Ministro', component: AnexosPage},
      { title: 'Segurança Social', component: AnexosPage },
      { title: 'Serviços de Estrangeiros e Fronteiras', component: AnexosPage },
    ]; 
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
  if (this.plt.is('cordova')) {
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
    else{
      this.storage.set('first', false);

    }
  }

  viewItem(item){
    this.navCtrl.push(DetailsPage, {
        item:item,
        storage: this.storage
    });
  }

  openAnexo(anexo) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(anexo.component, {storage: this.storage, entidade: anexo.title});

  }
}

