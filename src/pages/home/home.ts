import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  images = [];
  isLoggedIn = false;

  constructor(
    public navCtrl: NavController,
    private _sanitizer: DomSanitizer,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
  ) {
    // this.sanitization.bypassSecurityTrustStyle(`url(${element.image})`);
    this.images.push(
      { imagePath: this._sanitizer.bypassSecurityTrustStyle(`url(assets/imgs/welcome-1.jpg)`)},
      { imagePath: this._sanitizer.bypassSecurityTrustStyle(`url(assets/imgs/welcome-2.jpg)`)},
      { imagePath: this._sanitizer.bypassSecurityTrustStyle(`url(assets/imgs/welcome-3.jpg)`)},
      { imagePath: this._sanitizer.bypassSecurityTrustStyle(`url(assets/imgs/welcome-4.jpg)`)},
    );
  }

  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      if( barcodeData.text ) {
        this.isLoggedIn = true;
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
