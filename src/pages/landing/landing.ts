import { RestProvider } from './../../providers/rest/rest';
import { ProductsPage } from './../products/products';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  categories;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public restProvider: RestProvider,
    private screenOrientation: ScreenOrientation,
    private _menu: MenuController
  ) { 
    this._menu.enable(true, 'myMenu');
    platform.registerBackButtonAction(() => {
      //sometimes the best thing you can do is not think, not wonder, not imagine, not obsess. 
      //just breathe, and have faith that everything will work out for the best.
    },1);
    this.restProvider.getCategories().then(data => {
      this.categories = data;
    });
  }

  ionViewDidLoad() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }

  navToProductsBycateg(id: number, name: string) {
    this.navCtrl.push(ProductsPage, {
      categoryId: id,
      categoryName: name,
    });
  };
}
