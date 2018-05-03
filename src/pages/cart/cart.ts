import { GlobalProvider } from './../../providers/global/global';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _globalProvider: GlobalProvider
  ) { 
    _globalProvider.orders.subscribe(data => {
      console.log(data);
    });
  }

  ionViewDidLoad() { }

}
