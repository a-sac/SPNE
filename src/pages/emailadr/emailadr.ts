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
  token: any;

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
      "telemovel": "913456202",
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
      this.homeService.getEmail(this.ea);
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
      this.homeService.getTel(this.tel).subscribe(response => {
        this.token = response;
      });
      this.showTEL=false;
      this.showTELT=true;
    }
  }

  toggleTELT(){
    if(this.telt!=undefined && this.telt!=null && this.telt==this.token.token){
      this.storage.set('adesao', "aderiu");
      this.storage.set('mensagens', { "data": [ { "mid": "000000001", "titulo": "Apreciação de Pedido de Isenção de IMI", "entidade": "Autoridade Tributária","conteudo": " <p>Muitas famílias ainda não se encontram a par das novas regras relativas ao pedido de isenção do IMI em 2018.</p><p>Para quem está a <a href=\"https:\/\/www.nvalores.pt\/comprar-a-primeira-casa\/\">comprar casa pela primeira vez</a>, o IMI (Imposto Municipal sobre Imóveis) é um imposto de carácter anual que é aplicado sobre o VPT (valor patrimonial tributário) e que incide sobre todos os prédios que se encontrem sediados em Portugal.</p><p>É ainda importante frisar, que o valor do IMI reverte na sua totalidade para os municípios.</p><p>De forma simples, o que acontece é que anualmente, a grande maioria dos contribuintes tem de liquidar o mesmo, mas a taxa aplicada pode variar de acordo com o município em questão (desde que a taxa se encontre dentro dos montantes mínimos e máximos que podem ser aplicados de acordo com o CIMI – Código do Imposto Municipal sobre Imóveis).</p> <p>É importante salientar que a taxa mínima aplicada é de 0,3%, enquanto a máxima é de 0,5% (no entanto a grande maioria dos municípios aplica uma taxa intermédia).\<\/p\>" ,"emissao": "2018-09-02T15:52:17", "modificacao": "2018-09-10T11:12:19", "tipo": "notificacao", "linha-1": "Isenção IMI", "linha-2": "Art. 2687 D", "validade": ["2019-08-02T15:52:17", "2019-09-02T15:52:17"], "imagem": null, "estado": "Aprovado", "valor": null, "spne-estado": "nao-lida", "spne-alerta": null, "spne-local": "entrada", "anexos": ["http://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/Cod_download/Documents/CIRS.pdf"] }, { "mid": "000000002", "titulo": "Pagamento IUC Julho/2018", "entidade": "Autoridade Tributária", "conteudo": "Conteudo da mensagem", "emissao": "2018-07-25T10:35:41", "modificacao": "2018-07-26T10:35:41", "tipo": "alerta", "linha-1": "Pagamento Único de Circulação", "linha-2": "74-GE-02", "validade": ["2018-08-30T00:00:00", "2019-08-30T00:00:00"], "imagem": null, "estado": null, "valor": 123.71, "spne-estado": "lida", "spne-alerta": null, "spne-local": "entrada", "anexos": [] } ] } );
      this.navCtrl.setRoot(HomePage,{
        storage: this.storage
      });
    } else{
      let alert = this.alertCtrl.create({
        title: 'Token',
        message: 'Token Errado!',
        buttons:[
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              console.log('Ok clicked');
            }
          }
        ]
      })
      alert.present()
    }
  }
  
}
