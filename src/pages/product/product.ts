import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GlobalProvider } from './../../providers/global/global';
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
    public _globalProvider: GlobalProvider
  ) {
    this.product = this.navParams.data; 
  }

  ionViewDidLoad() { }

  addOrder(quantity) {
  }
}
