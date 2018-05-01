import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  // domain = 'http://10.163.90.25/menu_ordering';
  currency = 'PHP';
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

  getProductsByCategory(categoryId: number) {
    const returnData = [];
    return new Promise(resolve => {
      this.http.get(this.domain+'/getProductsByCategoryId/'+categoryId).subscribe(data => {
        Object.keys(data).forEach(key => {
          returnData.push({
            'category_id'       : data[key]['Product']['category_id'],
            'description'       : data[key]['Product']['description'],
            'id'                : data[key]['Product']['id'],
            'image_path'        : data[key]['Product']['image_path'] ?  this.domain + data[key]['Product']['image_path'] : this.domain + '/images/default.jpg',
            'is_not_available'  : data[key]['Product']['is_not_available'],
            'name'              : data[key]['Product']['name'],
            'price'             : this.currency + ' ' +data[key]['Product']['price'],
          });
        });
        resolve(returnData);
      }, err => {
        console.log(err);
      });
    });
  }
}
