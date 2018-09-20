import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'details.html'
})
export class DetailsPage {
    item: any;
    date1: any;
    colors: any;

    constructor(public navCtrl: NavController, public params: NavParams) {
        this.colors={
            alerta : 'orange',
            notificacao : '#143363'
        };
        this.item = params.get('item');
        this.date1 = new Date(Date.parse(this.item.validade[1]));
    }

}
