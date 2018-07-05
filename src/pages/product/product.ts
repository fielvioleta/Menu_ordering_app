import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from './../../providers/global/global';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  product;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _globalProvider: GlobalProvider,
    public _alerCtrl: AlertController
  ) {
    this.product = this.navParams.data; 
  }

  ionViewDidLoad() { }

  addOrder(q) {
    const product   = this.product;
    const quantity    = q.value;
    if ( quantity ) {
      let confirm = this._alerCtrl.create({
        title: 'Add to orders?',
        message: 'add ' + quantity + ' ' + product.name + ' ?' ,
        buttons: [
          {
            text: 'Cancel', handler: () => { }
          },{
            text: 'Yes', handler: () => {
              this._globalProvider.putOrder(product, quantity);
            }
          }
        ]
      });
      confirm.present();
    }
  }
}
