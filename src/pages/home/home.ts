import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import { DetailsPage } from './../details/details';
import { Platform, AlertController } from 'ionic-angular';
import {  NavParams, LoadingController } from 'ionic-angular';
import { HomeService } from '../../app/services/home.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  storage: any;
  key: any;
  token: any;
  loading: any;
  messages: any;
  date1: any;
  colors: any;

  constructor(public loadingCtrl: LoadingController, public plt: Platform, public navCtrl: NavController,
    public sanitizer: DomSanitizer, public navParams: NavParams, private homeService: HomeService, private alertCtrl: AlertController) {
    this.storage = navParams.get('storage');
    this.colors={ 
      alerta : 'orange', 
      notificacao : 'blue' 
    };
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    this.messages = { "data": [ { "mid": "000000001", "titulo": "Apreciação de Pedido de Isenção de IMI", "entidade": "Autoridade Tributária","conteudo": "Conteudo da mensagem" ,"emissao": "2018-09-02T15:52:17", "modificacao": "2018-09-10T11:12:19", "tipo": "notificacao", "linha-1": "Isenção IMI", "linha-2": "Art. 2687 D", "validade": ["2019-08-02T15:52:17", "2019-09-02T15:52:17"], "imagem": null, "estado": "Aprovado", "valor": null, "spne-estado": "nao-lida", "spne-alerta": null, "spne-local": "entrada" }, { "mid": "000000002", "titulo": "Pagamento IUC Julho/2018", "entidade": "Autoridade Tributária", "conteudo": "Conteudo da mensagem", "emissao": "2018-07-25T10:35:41", "modificacao": "2018-07-26T10:35:41", "tipo": "alerta", "linha-1": "Pagamento Único de Circulação", "linha-2": "74-GE-02", "validade": ["2018-08-30T00:00:00", "2019-08-30T00:00:00"], "imagem": null, "estado": null, "valor": 123.71, "spne-estado": "lida", "spne-alerta": null, "spne-local": "entrada" } ] } ;
    this.date1 = new Date(Date.parse(this.messages.data[0].validade[1]));
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

  viewItem(item){
    this.navCtrl.push(DetailsPage, {
        item:item
    });
  }
}

