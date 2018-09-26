import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Platform } from 'ionic-angular';

@Component({
  templateUrl: 'details.html'
})

export class DetailsPage {
    item: any;
    date1: any;
    colors: any;
    anexo: any;
    constructor(public navCtrl: NavController, public params: NavParams, private iab: InAppBrowser, public plt: Platform) {
        this.colors={
            alerta : 'orange',
            notificacao : '#143363'
        };
        this.item = params.get('item');
        this.date1 = new Date(Date.parse(this.item.validade[1]));
        this.anexo = this.item.anexos[0];
    }


  download(){
    const browser = this.iab.create(this.anexo);
    browser.show();
  }


}
