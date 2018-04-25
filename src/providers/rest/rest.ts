import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  // domain = 'http://menu.local';
  // domain = 'http://10.163.90.25/menu_ordering';
  domain = 'http://192.168.0.102/menu_ordering';

  constructor(public http: HttpClient) { }

  getProducts() {
    return new Promise(resolve => {
      this.http.get(this.domain+'/getProducts').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
  
  getCategories() {
    return new Promise(resolve => {
      this.http.get(this.domain+'/getCategories').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
}
