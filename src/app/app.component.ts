import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LandingPage } from './../pages/landing/landing';
import { CartPage } from '../pages/cart/cart';
import { ProductsPage } from './../pages/products/products';

import { RestProvider } from './../providers/rest/rest';
import { GlobalProvider } from '../providers/global/global';

import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage      : any = HomePage;
  categories;

  constructor(
    platform: Platform,
    public _restProvider: RestProvider,
    public _globalProvider: GlobalProvider,
    public menuCtrl: MenuController,
    private fcm: FCM,
    private screenOrientation: ScreenOrientation
  ) {
    platform.ready().then(() => { });

    this._restProvider.getCategories().then(data => {
      this.categories = data;
    });
  }
  
  navToProductsBycateg(id: number, name: string) {
    this.nav.push(ProductsPage, {
      categoryId: id,
      categoryName: name,
    });
    this.menuCtrl.close();
  };
  
  navToHome() {
    this.nav.push(LandingPage);
    this.menuCtrl.close();
  }
  
  navToCart() {
    this.nav.push(CartPage);
    this.menuCtrl.close();
  }

  requestBillOut() {
    const orderId = this._globalProvider.orderId.value;
    this._restProvider.sendRequestBill(orderId).then(data => {
      if(data) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        this._restProvider.sendMessageToCounter();
        this.nav.push(HomePage);
        this.menuCtrl.close();
      }
    });
  }

  logout() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.fcm.unsubscribeFromTopic('table'+this._globalProvider.tableId.value);
    this._globalProvider.ordered.next([]);
    this._globalProvider.orders.next([]);
    this._globalProvider.orderId.next(null);
    this._globalProvider.tableId.next(null);
    this.nav.push(HomePage);
    this.menuCtrl.close();
  }
}

