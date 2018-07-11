import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';
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
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private _sanitizer: DomSanitizer,
    private _rest: RestProvider,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
  ) {
    this.images.push(
      { imagePath: this._sanitizer.bypassSecurityTrustStyle(`url(assets/imgs/welcome-1.jpg)`)},
      { imagePath: this._sanitizer.bypassSecurityTrustStyle(`url(assets/imgs/welcome-2.jpg)`)},
      { imagePath: this._sanitizer.bypassSecurityTrustStyle(`url(assets/imgs/welcome-3.jpg)`)},
      { imagePath: this._sanitizer.bypassSecurityTrustStyle(`url(assets/imgs/welcome-4.jpg)`)},
    );
  }

  crewLogin() {
    this.navCtrl.push(KitchenPage);
    // const prompt = this.alertCtrl.create({
    //   title: 'Login',
    //   message: "Please enter username and password for kitchen or counter",
    //   inputs: [
    //     {
    //       name: 'username',
    //       placeholder: 'Username'
    //     },
    //     {
    //       name: 'password',
    //       placeholder: 'Password',
    //       type: 'password'
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       handler: () => { }
    //     },
    //     {
    //       text: 'Login',
    //       handler: data => {
    //         this._rest.crewLogin(data.username, data.password).then(res => {
    //           if ( res['user_type'] ==3 ) { // kitchen
    //             this.navCtrl.push(KitchenPage);
    //           } else if( res['user_type'] ==2) { //counter
    //             this.navCtrl.push(CounterPage);
    //           }
    //         });
    //       }
    //     }
    //   ]
    // });
    // prompt.present();
  }

  scan() {
    this.navCtrl.push(LandingPage);
    // this.barcodeScanner.scan().then((barcodeData) => {
    //   const data = JSON.parse(barcodeData.text);
    //   switch(data.for) {
    //     case 'counter':
    //       this.navCtrl.push(CounterPage);
    //       break;
    //     case 'kitchen':
    //       this.navCtrl.push(KitchenPage);
    //       break;
    //     case 'customer':
    //       this.navCtrl.push(LandingPage)
    //       break;
    //   }
    // }, (err) => {
    //   this.toast.show(err, '5000', 'center').subscribe(
    //     toast => {
    //       console.log(toast);
    //     }
    //   );
    // });
  }
}
