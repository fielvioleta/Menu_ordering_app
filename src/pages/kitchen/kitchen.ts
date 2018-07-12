import { RestProvider } from './../../providers/rest/rest';
import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { FCM } from '@ionic-native/fcm';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';

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

  @ViewChild(Navbar) navBar: Navbar;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public _restProvider: RestProvider,
    private fcm: FCM,
    private _ngZone: NgZone,
    private screenOrientation: ScreenOrientation
  ) {
    platform.registerBackButtonAction(() => {
      //sometimes the best thing you can do is not think, not wonder, not imagine, not obsess. 
      //just breathe, and have faith that everything will work out for the best.
    },1);

    this.getOrders();
    this.getProducts();
  }
  
  ionViewDidLoad() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.fcm.subscribeToTopic('kitchen');
    this.fcm.onNotification().subscribe(data => {
      this._ngZone.run(()=> {
        this.getOrders();
        this.getProducts();
      });
    });

    this.navBar.backButtonClick = (e:UIEvent)=>{
     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
     this.fcm.unsubscribeFromTopic('kitchen');
     this.navCtrl.pop();
    }
  }

  acceptOrder(orderDetailId: number, status: number) {
    this._restProvider.updateKitchenStatus(orderDetailId, status).then(data => {
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
