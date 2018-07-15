import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GlobalProvider } from './../../providers/global/global';
import { RestProvider } from '../../providers/rest/rest';

import { FCM } from '@ionic-native/fcm';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  orders;
  ordered;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _globalProvider: GlobalProvider,
    public _restProvider: RestProvider,
    private fcm: FCM,
    private _ngZone: NgZone,
  ) { 
    // this.fcm.subscribeToTopic('table'+this._globalProvider.tableId.getValue());
    // this.fcm.onNotification().subscribe(data => {
    //   this._ngZone.run(()=> {
    //     this.getOrdersData();
    //     this.getOrderedData();
    //   });
    // });

    this.getOrdersData();
    this.getOrderedData();

    _globalProvider.orderId.subscribe(data =>{
      this.getOrderedData();
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
    this._restProvider.saveOrders(this.orders).then(data => {
      this._restProvider.sendMessageToKitchen();
    });
  }

  getOrdersData() {
    this._globalProvider.orders.subscribe(data => {
      this.orders = data;
    });
  }

  getOrderedData() {
    if(this._globalProvider.orderId.value !== null){
      this._restProvider.getOrderedData(this._globalProvider.orderId.value).then(data =>{
        this.ordered = data;
      });
    }
  }
}
