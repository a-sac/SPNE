import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import { Platform, AlertController } from 'ionic-angular';
import {  NavParams, LoadingController } from 'ionic-angular';
import { HomeService } from '../../app/services/home.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  item: any;
  key: any;
  show1: boolean;
  show2: boolean;
  tfront: boolean;
  tback: boolean;
  token: any;
  photo: any;
  ass: any;
  loading: any;
  storage: any;
  alljson: any;
  AM: any;
  A1: any;
  A2: any;
  A: any;
  B1: any;
  B: any;
  C1: any;
  C: any;
  D1: any;
  D: any;
  BE: any;
  C1E: any;
  CE: any;
  D1E: any;
  DE: any;
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
    this.show1=true;
    this.show2=false;
    this.tfront=true;
    this.tback=false;
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere...'
    });
    this.messages = { "data": [ { "mid": "000000001", "titulo": "Apreciação de Pedido de Isenção de IMI", "entidade": "Autoridade Tributária", "emissao": "2018-09-02T15:52:17", "modificacao": "2018-09-10T11:12:19", "tipo": "notificacao", "linha-1": "Isenção IMI", "linha-2": "Art. 2687 D", "validade": ["2019-08-02T15:52:17", "2019-09-02T15:52:17"], "imagem": null, "estado": "Aprovado", "valor": null, "spne-estado": "nao-lida", "spne-alerta": null, "spne-local": "entrada" }, { "mid": "000000002", "titulo": "Pagamento IUC Julho/2018", "entidade": "Autoridade Tributária", "emissao": "2018-07-25T10:35:41", "modificacao": "2018-07-26T10:35:41", "tipo": "alerta", "linha-1": "Pagamento Único de Circulação", "linha-2": "74-GE-02", "validade": ["2018-08-30T00:00:00", "2019-08-30T00:00:00"], "imagem": null, "estado": null, "valor": 123.71, "spne-estado": "lida", "spne-alerta": null, "spne-local": "entrada" } ] } ;
    this.date1 = new Date(Date.parse(this.messages.data[0].validade[1]));
  }

  ngOnInit() {

    this.navParams.get('storage').get('key').then((val) => {
      this.key= val;
      this.navParams.get('storage').get('token').then((val2) => {
        this.token=val2;
              this.navParams.get('storage').get('users').then( users =>{if(users){
                this.loading.present();
                this.alljson =  users;
                this.getUser();
                this.getPhoto();
                this.getAss();
                this.indice();
                this.loading.dismiss();
              }
              else{
                this.getPosts();
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

  getPosts(){
      this.loading.present();
      this.homeService.getPosts(this.key, this.token).subscribe(response => {
          this.alljson = response;
          this.storage.set('users', this.alljson);
          this.getUser();
          this.getPhoto();
          this.getAss();
          this.indice();
          this.loading.dismiss();
        });
  }

  getUser(){
    this.alljson.users.forEach(element => {
      if((element.secret == this.token) && (element.digital_key == this.key)) this.item=element;
    });
  }

  getPhoto(){
    this.photo=this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + this.item.photo);
  }

  getAss(){
    this.ass=this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + this.item.ass);
  }

  toggleB1(){
    this.show1=true;
    this.show2=false;
  }

  toggleB2(){
    this.show1=false;
    this.show2=true;
  }

  toggleTB(){
    this.tfront=false;
    this.tback=true;
  }

  toggleTF(){
    this.tback=false;
    this.tfront=true;
  }

  indice(){
    this.AM = -1;
    this.A1 = -1;
    this.A2 = -1;
    this.A = -1;
    this.B1 = -1;
    this.B = -1;
    this.C1 = -1;
    this.C = -1;
    this.D1 = -1;
    this.D = -1;
    this.BE = -1;
    this.C1E = -1;
    this.CE = -1;
    this.D1E = -1;
    this.DE = -1;
    var number = 0;
    this.item.types.forEach(element => {
      if(this.item.types[number]['name']=='B'){
        this.B = number;
      }
    });
  }
}

