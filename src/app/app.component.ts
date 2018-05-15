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
      // this.fcm.getToken().then(token => {
      //   // alert(token);
      // });
      // this.fcm.subscribeToTopic('test');
      // this.fcm.onNotification().subscribe(data => {
      //   if(data.wasTapped){
      //     alert( JSON.stringify(data) );
      //   }else{
      //     alert( JSON.stringify(data) );
      //   }
      // });

      // this.restProvider.sendMessage();
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

