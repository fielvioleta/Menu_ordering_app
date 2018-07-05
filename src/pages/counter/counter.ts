import { RestProvider } from './../../providers/rest/rest';
import { FCM } from '@ionic-native/fcm';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  state: string = 'billOuts';
  billOuts: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fcm: FCM,
    public _restProvider: RestProvider,
  ) {
    this.fcm.subscribeToTopic('counter');
    this.fcm.onNotification().subscribe(data => {
      this.getBillOut();
    });

    this.getBillOut();
  }

  ionViewDidLoad() { }


  getBillOut() {
    this._restProvider.getBillOut().then(data => {
      this.billOuts = data;
    });
  }
}
