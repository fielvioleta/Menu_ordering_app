import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FCM } from '@ionic-native/fcm';

/**
 * Generated class for the KitchenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-kitchen',
  templateUrl: 'kitchen.html',
})
export class KitchenPage {
  state: string = 'orders';
  orders;
  products;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _restProvider: RestProvider,
    private fcm: FCM
  ) {
    this.fcm.subscribeToTopic('kitchen');
    this.fcm.onNotification().subscribe(data => {
      this.getOrders();
      this.getProducts();
    });

    this.getOrders();
    this.getProducts();
  }
  
  acceptOrder(orderDetailId: number, index: number) {
    this._restProvider.updateKitchenStatus(orderDetailId).then(data => {
      if(data) {
        this.getOrders();
        this._restProvider.sendMessageToCustomer();
      }
    });
  }
  
  getOrders() {
    this._restProvider.getOrders().then(data => {
      this.orders = data;
    });
  }

  getProducts() {
    this._restProvider.getProductsForKitchen().then(data =>{
      this.products = data;
    });
  }

  changeAvailability(productId: number, availability:number) {
    this._restProvider.updateAvailability(productId, availability).then(data => {
      if(data){
        this.getProducts();
      }
    });
  }
}
