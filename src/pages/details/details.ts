import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BrowserTab } from '@ionic-native/browser-tab';

@Component({
  templateUrl: 'details.html'
})

export class DetailsPage {
    item: any;
    date1: any;
    colors: any;
    mensagens: any;
    anexo: any;
    constructor(private browserTab: BrowserTab, public storage: Storage,public navCtrl: NavController, public params: NavParams, private iab: InAppBrowser, public plt: Platform) {
        this.colors={
            alerta : 'orange',
            notificacao : '#143363'
        };
        this.storage.get('mensagens').then((value) => {
            console.log(value)
            if(value){
              this.mensagens=value;
            }
          }, (reason) => {
            console.log(reason)
          });
        this.item = params.get('item');
        this.date1 = new Date(Date.parse(this.item.validade[1]));
        if(this.item.anexos){
          this.anexo = this.item.anexos[0];
        }
    }


  download(){
    if (this.plt.is('cordova')) {
      this.browserTab.isAvailable()
      .then(isAvailable => {
        if (isAvailable) {
          this.browserTab.openUrl(this.anexo);
        } else {
          // open URL with InAppBrowser instead or SafariViewController
        }
      });
    }else{
      const browser = this.iab.create(this.anexo);
      browser.show();
    }
  }

    arquivar(){
        var id = this.item.mid;
        if(this.mensagens.data){
            console.log("arquivei")
            this.mensagens.data.forEach(element => {
                if(element.mid==id){
                    element['spne-local']='arquivo';
                }
            });
            this.storage.set('mensagens',this.mensagens);
        }
    }


  existeAnexos(){
    return this.item.anexos.length > 0
  }

}
