import { RestProvider } from './../providers/rest/rest';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(
    platform: Platform,
    public restProvider: RestProvider
  ) {
    platform.ready().then(() => {
    });

    this.restProvider.getProducts().then(data => {
      console.log(data);
    });
  }

}

