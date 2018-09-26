import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'details.html'
})
export class DetailsPage {
    item: any;
    date1: any;
    colors: any;
    mensagens: any;

    constructor(public storage: Storage, public navCtrl: NavController, public params: NavParams) {
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
            this.navCtrl.push(this.navCtrl.getActive().component);
        }
    }

}
