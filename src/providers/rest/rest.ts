import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from '../global/global';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  currency  = '₱';
  domain    = 'http://menuordering.online';
  tableId;

  constructor(
    public http: HttpClient,
    public _globalProvider: GlobalProvider,
    public _alerCtrl: AlertController
  ) {
    this._globalProvider.tableId.subscribe(id => {
      this.tableId = id;
    });
  }

  getProducts() {
    return new Promise(resolve => {
      this.http.get(this.domain+'/apis/getProducts').subscribe(data => {
        resolve(data);
      }, err => {
        alert(err);
      });
    });
  }
  
  getCategories() {
    return new Promise(resolve => {
      this.http.get(this.domain+'/apis/getCategories').subscribe(data => {
        resolve(data);
      }, err => {
        alert(err);
      });
    });
  }

  getProductsByCategory(categoryId: number) {
    const returnData = [];
    return new Promise(resolve => {
      this.http.get(this.domain+'/apis/getProductsByCategoryId/'+categoryId).subscribe(data => {
        Object.keys(data).forEach(key => {
          returnData.push({
            'category_id'       : data[key]['Product']['category_id'],
            'description'       : data[key]['Product']['description'],
            'id'                : data[key]['Product']['id'],
            'image_path'        : data[key]['Product']['image_path'] ?  this.domain + data[key]['Product']['image_path'] : this.domain + '/images/default.jpg',
            'is_not_available'  : data[key]['Product']['is_not_available'],
            'name'              : data[key]['Product']['name'],
            'price'             : data[key]['Product']['price'],
            'currency'          : this.currency
          });
        });
        resolve(returnData);
      }, err => {
        alert(err);
      });
    });
  }

  sendMessage() {
    const data = {
      'notification': {
        'title'                     : 'Notification title',
        'body'                      : 'Notification body',
        'sound'                     : 'default',
        'click_action'              : 'FCM_PLUGIN_ACTIVITY',
        'icon'                      : 'fcm_push_icon'
      },
      'data': {
        'param1'                    : 'value',
        'param2'                    : 'value'
      },
        'to'                        : '/topics/test',
        'priority'                  : 'high',
        'restricted_package_name'   : ''
    }
    
    return new Promise(resolve => {
      this.http.post('https://fcm.googleapis.com/fcm/send', JSON.stringify(data), {
        headers: new HttpHeaders().set('Authorization', 'key=AIzaSyAh9l4xnckqsQYdeddybvEGWUzjbQ4ungA').set("Content-Type", "application/json"),
      })
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        alert(JSON.stringify(err));
      });
    });
  }

  saveOrders(orders: any) {
    // let confirm = this._alerCtrl.create({
    //   title: 'Confirm order',
    //   message: 'Once you confirm you cannot cancel your order?' ,
    //   buttons: [
    //     {
    //       text: 'Cancel', handler: () => { }
    //     },{
    //       text: 'Yes', handler: () => {
    //         this._globalProvider.putOrder(product, quantity);
    //       }
    //     }
    //   ]
    // });
    // confirm.present();
    
    const ordersData = [];
    orders.forEach(order => {
      ordersData.push({
        'product_id'      : order.product.id,
        'quantity'        : order.quantity,
        'kitchen_status'  : 0,
        'sub_total'       : (order.quantity * order.product.price),
      });
    });
    const params = {
      'table_id'  : this.tableId,
      'orders'    : ordersData
    }
    // this.http.post('http://menu.local/apis/saveOrders', orders, {headers: {'Content-Type': 'application/json'}}).subscribe(data => {
    //   console.log(data);
    // });
  }
}
