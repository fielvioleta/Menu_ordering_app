import { ProductsPage } from './../products/products';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform
  ) { 
    platform.registerBackButtonAction(() => {
      //sometimes the best thing you can do is not think, not wonder, not imagine, not obsess. 
      //just breathe, and have faith that everything will work out for the best.
    },1);
  }

  ionViewDidLoad() {
  }

  navToProductsBycateg() {
    this.navCtrl.push(ProductsPage);
  };
}
