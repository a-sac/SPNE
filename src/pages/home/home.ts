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
    this.messages = { "data": [ { "mid": "000000001", "titulo": "Apreciação de Pedido de Isenção de IMI", "entidade": "Autoridade Tributária","conteudo": " <p>Muitas famílias ainda não se encontram a par das novas regras relativas ao pedido de isenção do IMI em 2018.</p><p>Para quem está a <a href=\"https:\/\/www.nvalores.pt\/comprar-a-primeira-casa\/\">comprar casa pela primeira vez</a>, o IMI (Imposto Municipal sobre Imóveis) é um imposto de carácter anual que é aplicado sobre o VPT (valor patrimonial tributário) e que incide sobre todos os prédios que se encontrem sediados em Portugal.</p><p>É ainda importante frisar, que o valor do IMI reverte na sua totalidade para os municípios.</p><p>De forma simples, o que acontece é que anualmente, a grande maioria dos contribuintes tem de liquidar o mesmo, mas a taxa aplicada pode variar de acordo com o município em questão (desde que a taxa se encontre dentro dos montantes mínimos e máximos que podem ser aplicados de acordo com o CIMI – Código do Imposto Municipal sobre Imóveis).</p> <p>É importante salientar que a taxa mínima aplicada é de 0,3%, enquanto a máxima é de 0,5% (no entanto a grande maioria dos municípios aplica uma taxa intermédia).\<\/p\>" ,"emissao": "2018-09-02T15:52:17", "modificacao": "2018-09-10T11:12:19", "tipo": "notificacao", "linha-1": "Isenção IMI", "linha-2": "Art. 2687 D", "validade": ["2019-08-02T15:52:17", "2019-09-02T15:52:17"], "imagem": null, "estado": "Aprovado", "valor": null, "spne-estado": "nao-lida", "spne-alerta": null, "spne-local": "entrada", "anexos": ["http://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/Cod_download/Documents/CIRS.pdf"] }, { "mid": "000000002", "titulo": "Pagamento IUC Julho/2018", "entidade": "Autoridade Tributária", "conteudo": "Conteudo da mensagem", "emissao": "2018-07-25T10:35:41", "modificacao": "2018-07-26T10:35:41", "tipo": "alerta", "linha-1": "Pagamento Único de Circulação", "linha-2": "74-GE-02", "validade": ["2018-08-30T00:00:00", "2019-08-30T00:00:00"], "imagem": null, "estado": null, "valor": 123.71, "spne-estado": "lida", "spne-alerta": null, "spne-local": "entrada", "anexos": [] } ] } ;
    this.date1 = new Date(Date.parse(this.messages.data[0].validade[1]));
    this.storage.get('mensagens').then((value) => {
      console.log(value)
      if(value){
        this.messages=value;
        this.date1 = new Date(Date.parse(value.data[0].validade[1]))
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
      { title: 'Primeiro Ministro', component: AnexosPage },
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

