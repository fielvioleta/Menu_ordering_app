import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GlobalProvider } from './../../providers/global/global';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  orders;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _globalProvider: GlobalProvider,
    public _restProvider: RestProvider
  ) { 
    _globalProvider.orders.subscribe(data => {
      this.orders = data;
    });
  }

  ionViewDidLoad() { }

  addQuantity(order: any) {
    order.quantity++;
  }

  decreaseQuantity(order: any) {
    if(order.quantity>1){
      order.quantity--;
    }
  }
  
  removeItem(orderIndex: number) {
    this._globalProvider.removeOrder(orderIndex);
  }

  saveOrders() {
    this._restProvider.saveOrders(this.orders);
  }
}
