import { ProductsPage } from './../pages/products/products';
import { RestProvider } from './../providers/rest/rest';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';

import { HomePage } from '../pages/home/home';

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
    public menuCtrl: MenuController
  ) {
    platform.ready().then(() => {
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

}

