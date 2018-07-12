import { RestProvider } from './../../providers/rest/rest';
import { FCM } from '@ionic-native/fcm';
import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { Navbar } from 'ionic-angular';

/**
 * Generated class for the CounterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-counter',
  templateUrl: 'counter.html',
})
export class CounterPage {

  @ViewChild(Navbar) navBar: Navbar;

  state: string = 'billOuts';
  billOuts: any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private fcm: FCM,
    public _restProvider: RestProvider,
    private _ngZone: NgZone,
    private screenOrientation: ScreenOrientation
  ) {
    platform.registerBackButtonAction(() => {
      //sometimes the best thing you can do is not think, not wonder, not imagine, not obsess. 
      //just breathe, and have faith that everything will work out for the best.
    },1);

    this.getBillOut();
  }

  ionViewDidLoad() {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    
    this.fcm.subscribeToTopic('counter');
    this.fcm.onNotification().subscribe(data => {
      this._ngZone.run(()=> {
        this.getBillOut();
      });
    });
    
    this.navBar.backButtonClick = (e:UIEvent)=>{
     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
     this.fcm.unsubscribeFromTopic('counter');
     this.navCtrl.pop();
    }
  }
  getBillOut() {
    this._restProvider.getBillOut().then(data => {
      this.billOuts = data;
    });
  }
}
