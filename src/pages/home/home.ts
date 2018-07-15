import { GlobalProvider } from './../../providers/global/global';
import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { LandingPage } from '../landing/landing';
import { KitchenPage } from './../kitchen/kitchen';
import { CounterPage } from './../counter/counter';

import { RestProvider } from './../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  images = [];

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public _navCtrl: NavController,
    public _alertCtrl: AlertController,
    public _sanitizer: DomSanitizer,
    public _rest: RestProvider,
    public _menu: MenuController,
    public _global: GlobalProvider
  ) {
    this._menu.enable(false, 'myMenu');
    this.images.push(
      { imagePath: this._sanitizer.bypassSecurityTrustStyle(`url(assets/imgs/welcome-1.jpg)`)},
      { imagePath: this._sanitizer.bypassSecurityTrustStyle(`url(assets/imgs/welcome-2.jpg)`)},
      { imagePath: this._sanitizer.bypassSecurityTrustStyle(`url(assets/imgs/welcome-3.jpg)`)},
      { imagePath: this._sanitizer.bypassSecurityTrustStyle(`url(assets/imgs/welcome-4.jpg)`)},
    );
  }

  crewLogin() {
    const prompt = this._alertCtrl.create({
      title: 'Login',
      message: "Please enter username and password for kitchen or counter",
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => { }
        },
        {
          text: 'Login',
          handler: data => {
            this._rest.crewLogin(data.username, data.password).then(res => {
              if(!res) {
                alert( 'Username and password is incorrect' );
              } else if ( res['user_type'] == 3 ) { // kitchen
                this._navCtrl.push(KitchenPage);
              } else if( res['user_type'] == 2) { //counter
                this._navCtrl.push(CounterPage);
              }
            });
          }
        }
      ]
    });
    prompt.present();
  }

  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.text) {
        this._global.tableId.next(+barcodeData.text);
        this._navCtrl.push(LandingPage);
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }
}
