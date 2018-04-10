import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeService } from '../../app/services/home.service';

@Component({
  selector: 'qrcode',
  templateUrl: 'qrcode.html'
})
export class QrCodePage {
  items: any;
  showAll: boolean;
  show18: boolean;
  show21: boolean;
  output18: any;
  output21: any;

  constructor(public navCtrl: NavController, private homeService: HomeService) {
    this.showAll=false;
    this.show18=false;
    this.show21=false;
  }

  createJSON18(){
    if(this.items!=undefined){
      var data = this.items[0][3].split(" ", 3);
      var d = new Date(Date.parse(data[1]+"/"+data[0]+"/"+data[2]));
      var time = (new Date().getTime()) - d.getTime();
      var ageDate = new Date(time);
      var anos = Math.abs(ageDate.getUTCFullYear() - 1970);
      
      if(anos>18){
        var obj: any = 
        [{
        maior18:true
        }];
        this.output18 = obj;
      }
      else{
        var obj: any = 
        [{
        maior18:false
        }];
        this.output18 = obj;
      }
    }
  }

  createJSON21(){
    if(this.items!=undefined){
      var data = this.items[0][3].split(" ", 3);
      var d = new Date(Date.parse(data[1]+"/"+data[0]+"/"+data[2]));
      var time = (new Date().getTime()) - d.getTime();
      var ageDate = new Date(time);
      var anos = Math.abs(ageDate.getUTCFullYear() - 1970);
      
      if(anos>21){
        var obj: any = 
        [{
        maior21:true
        }];
        this.output21 = obj;
      }
      else{
        var obj: any = [
        {
        maior21:false
        }];
        this.output21 = obj;
      }
    }
  }

  toggleAllInfo(){
    console.log(this.items);
    if(this.showAll){
      this.showAll=false;
    }
    else{
      this.showAll=true;
    }
  }

  toggle18(){
    this.createJSON18();
    if(this.show18){
      this.show18=false;
    }
    else{
      this.show18=true;
    }
  }

  toggle21(){
    this.createJSON21();
    if(this.show21){
      this.show21=false;
    }
    else{
      this.show21=true;
    }
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(){
    this.homeService.getPosts().subscribe(response => {
        this.items =response.data;
    });
  }
}
