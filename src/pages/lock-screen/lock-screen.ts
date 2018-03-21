import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { PincodeController } from "ionic2-pincode-input/dist";
import {FingerprintAIO, FingerprintOptions} from "@ionic-native/fingerprint-aio";

import CryptoJS from 'crypto-js';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-lockscreen',
  templateUrl: 'lock-screen.html'
})
export class LockScreenPage {

  code: string;
  faioOptions: FingerprintOptions
  //Fazer tentativas depois

  constructor(public navCtrl: NavController, public navParams: NavParams, public pincodeCtrl: PincodeController,
  private storage: Storage, private alertCtrl: AlertController, private faio: FingerprintAIO, private platform: Platform) {
    this.faioOptions = {
       clientId: 'Fingerprint-Demo',
       clientSecret: 'password', //Only necessary for Android
       disableBackup:true,  //Only for Android(optional)
       localizedFallbackTitle: 'Use o Pin', //Only for iOS
       localizedReason: 'Por favor authentique-se' //Only for iOS
    }
  }

  ionViewDidLoad() {
    // Try to get password stored
    this.storage.get('password_encrypt').then(pdw => {
      if (pdw) {
        console.log("Encrypted passwordk: " + pdw)
      }
      // Give a welcome to user and answer for new password
      else {
        this.presentAlert('PIN', "Para começar a usar a aplicação precisa de configurar um PIN de 6 digitos.", true)
      }
    })
    .catch((error: any) => console.log(error))
  }

  openPinCode(register: boolean): any {
    let pinCode = this.pincodeCtrl.create({
      title: 'Insira um PIN',
      passSize: 6,
      hideForgotPassword: true,
      hideCancelButton: register,
      enableBackdropDismiss: !register  //Se estiver a registar tem que configurar
    });

    pinCode.present();

    pinCode.onDidDismiss((code, status) => {
      // If user enter a password and the fase if confirm
      // do a login
      if (status === 'done' && !register) {
        this.login(code);
      }
      // Make a registration to user
      else if (status === 'done' && register) {
        this.code = code;
        // Confirm if pincodes match
        this.confirmCode();
      }
    })
  }

  confirmCode(): any {
    let pinCode = this.pincodeCtrl.create({
      title: 'Confirme o seu PIN',
      passSize: 6,
      hideForgotPassword: true,
      hideCancelButton:true,
      enableBackdropDismiss: false
    });
    pinCode.present();
    pinCode.onDidDismiss((code, status) => {
      if (status === 'done') {
        if (this.code == code) {
          // if match send a message and do a registration of pin code
          this.presentAlert("PIN configurado!", "Pode mudar o PIN mais tarde nas Definições.", false);
          this.register(code);
        }
        else {
          this.presentAlert("Erro!", "Os PINs inseridos não são iguais. Tente novamente.", false);
          this.openPinCode(true);
        }
      }
    })
  }

  async showTouchID() {
    try {
      await this.platform.ready();
      const available = await this.faio.isAvailable();
      console.log(available);
      if (available === "OK") {
        this.faio.show(this.faioOptions).then(res =>{
          this.navCtrl.setRoot(HomePage, {
            pincode: this.storage.get('password_encrypt')
          });
        })
        
      }
    } catch (error) {
      console.error(error);
    }
    
  }

  presentAlert(title: string, message: string, register: boolean) {
    var botoes;
    if (register) {
      botoes = [
        {
          text: 'OK',
          handler: () => {
            this.openPinCode(true);
          }
        }
      ]
    } else {
      botoes = ["OK"]
    }
    
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: botoes
    });
    alert.present();
  }
  
  //Encryption
  register(pincode) {
    let hash = String(CryptoJS.SHA256(pincode))
    this.storage.set('password_encrypt', hash);
    this.storage.set('settings',"");
    this.navCtrl.setRoot(HomePage, {
      pincode: hash
    });
  }

  login(pincode) {
    // store passwords 
    let entered_pincode = String(CryptoJS.SHA256(pincode))
    // get password stored on local storage
    this.storage.get('password_encrypt').then(pwd => {
      let stored_pincode = String(pwd)
      console.log("Stored password: " + stored_pincode)

      // if match go to home page
      if (entered_pincode == stored_pincode) {
        this.navCtrl.setRoot(HomePage, {
          pincode: entered_pincode
        });
      }
      else {
        this.presentAlert("Erro", "PIN errado", false)
      }
    })
    .catch((error: any) => console.log(error));
  }
}
