import { RestProvider } from './../../providers/rest/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  categoryId: number;
  categoryName: string;
  products;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public restProvider: RestProvider
  ) {
    this.categoryId   = this.navParams.data.categoryId;
    this.categoryName = this.navParams.data.categoryName

    this.restProvider.getProductsByCategory(this.categoryId).then(data => {
      this.products = data;
    });
  }

  ionViewDidLoad() {  }

}
