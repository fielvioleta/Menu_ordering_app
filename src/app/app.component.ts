import { ProductsPage } from './../pages/products/products';
import { RestProvider } from './../providers/rest/rest';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { LandingPage } from './../pages/landing/landing';
import { CartPage } from '../pages/cart/cart';

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
    public restProvider: RestProvider,
    public menuCtrl: MenuController,
    private fcm: FCM
  ) {
    platform.ready().then(() => {
      this.fcm.getToken().then(token => {
        alert(token);
        // Your best bet is to here store the token on the user's profile on the
        // Firebase database, so that when you want to send notifications to this 
        // specific user you can do it from Cloud Functions.
      });
    });

    this.restProvider.getCategories().then(data => {
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
}

