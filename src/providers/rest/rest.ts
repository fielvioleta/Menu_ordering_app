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
  // domain    = 'http://menu.local';
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

  crewLogin (username, password) {
    return new Promise(resolve => {
      const params = {
        'username'  : username,
        'password'  : password
      }
      
      this.http.post(this.domain+'/apis/checkAccount', params, {headers: {'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        alert(JSON.stringify(err));
      });
    });
  }

  getProducts() {
    return new Promise(resolve => {
      this.http.get(this.domain+'/apis/getProducts').subscribe(data => {
        resolve(data);
      }, err => {
        alert(JSON.stringify(err));
      });
    });
  }
  
  getCategories() {
    return new Promise(resolve => {
      this.http.get(this.domain+'/apis/getCategories').subscribe(data => {
        resolve(data);
      }, err => {
        alert(JSON.stringify(err));
      });
    });
  }

  getOrderedData(order_id: number) {
    const returnData = [];
    return new Promise(resolve => {
      this.http.get(this.domain+'/apis/getOrderData/' + order_id).subscribe(data => {
        Object.keys(data).forEach(key => {
          returnData.push({
            'order_id'          : data[key]['order_id'],
            'quantity'          : data[key]['quantity'],
            'kitchen_status'    : data[key]['kitchen_status'],
            'image_path'        : data[key]['image_path'] ?  this.domain + data[key]['image_path'] : this.domain + '/images/default.jpg',
            'sub_total'         : data[key]['sub_total'],
            'name'              : data[key]['name'],
            'price'             : data[key]['price'],
            'currency'          : this.currency
          });
        });
        resolve(returnData);
      }, err => {
        alert(JSON.stringify(err));
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
        alert(JSON.stringify(err));
      });
    });
  }

  getBillOut() {
    return new Promise(resolve => {
      this.http.get(this.domain+'/apis/getBills').subscribe(data => {
        resolve(data);
      }, err => {
        alert(JSON.stringify(err));
      });
    });
  }

  getOrders() {
    const returnData = [];
    return new Promise(resolve => {
      this.http.get(this.domain+'/apis/getAllOrders').subscribe(data => {
        Object.keys(data).forEach(key => {
          returnData.push({
            'kitchen_status'          : data[key]['kitchen_status'],
            'product_image_path'      : data[key]['product_image_path'] ?  this.domain + data[key]['product_image_path'] : this.domain + '/images/default.jpg',
            'product_name'            : data[key]['product_name'],
            'quantity'                : data[key]['quantity'],
            'table_id'                : data[key]['table_id'],
            'order_detail_id'         : data[key]['order_detail_id'],
          });
        });
        resolve(returnData);
      }, err => {
        alert(JSON.stringify(err));
      });
    });
  }

  getProductsForKitchen() {
    return new Promise(resolve => {
      this.http.get(this.domain+'/apis/getProductsForKitchen').subscribe(data => {
        Object.keys(data).forEach(key => {
          data[key].Product.forEach(element => {
            element.image_path = element.image_path ?  this.domain + element.image_path : this.domain + '/images/default.jpg';
          });
        });
        resolve(data);
      }, err => {
        alert(JSON.stringify(err));
      });
    });
  }

  sendRequestBill(orderId: number) {
    return new Promise(resolve => {
      let confirm = this._alerCtrl.create({
        title: 'Bill out',
        message: 'Requesting bill out will close application' ,
        buttons: [
          {
            text: 'Cancel', handler: () => { }
          },{
            text: 'Yes', handler: () => {
              const params = {
                'order_id'  : orderId,
                'table_id'  : this._globalProvider.tableId.getValue()
              }
              
                this.http.post(this.domain+'/apis/sendRequestBill', params, {headers: {'Content-Type': 'application/json'}}).subscribe(data => {
                  resolve(data);
                }, err => {
                  alert(JSON.stringify(err));
                });
            }
          }
        ]
      });
      confirm.present();
    });
  }

  updateKitchenStatus(orderDetailId: number, status: number) {
    const params = {
      'id'  : orderDetailId,
      'status'  : status,
    }
    return new Promise(resolve => {
      this.http.post(this.domain+'/apis/updateKitchenStatus', params, {headers: {'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        alert(JSON.stringify(err));
      });
    });
  }
  
  updateAvailability(productId: number, availability: number) {
    const params = {
      'id'            : productId,
      'availability'  : availability
    }
    return new Promise(resolve => {
      this.http.post(this.domain+'/apis/updateAvailability', params, {headers: {'Content-Type': 'application/json'}}).subscribe(data => {
        resolve(data);
      }, err => {
        alert(JSON.stringify(err));
      });
    });
  }

  saveOrders(orders: any) {
    return new Promise(resolve => {
      let confirm = this._alerCtrl.create({
        title: 'Confirm order',
        message: 'Once you confirm you cannot cancel your order?' ,
        buttons: [
          {
            text: 'Cancel', handler: () => { }
          },{
            text: 'Yes', handler: () => {
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
                'order_id'  : this._globalProvider.orderId.value === null ? '' : this._globalProvider.orderId.value,
                'table_id'  : this.tableId,
                'orders'    : ordersData,
              }
              this.http.post(this.domain+'/apis/saveOrders', params, {headers: {'Content-Type': 'application/json'}}).subscribe(data => {
                this._globalProvider.orderId.next(data);
                this._globalProvider.moveOrderToOrdered();
                resolve(data);
              }, err => {
                alert(JSON.stringify(err));
              });
            }
          }
        ]
      });
      confirm.present();
    });
  }

  sendMessage(data) {
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

  sendMessageToKitchen() {
    const data = {
      'notification': {
        'title'                     : 'New order received',
        'body'                      : 'a new order has been placed by the customer',
      },
      'data': { },
        'to'                        : '/topics/kitchen',
        'priority'                  : 'high',
        'restricted_package_name'   : ''
    }
    this.sendMessage(data);
  }

  sendMessageToCustomer() {
    const data = {
      'notification': {
        'title'                     : 'Your order is in process',
        'body'                      : 'your order is in process please wait for your order',
      },
      'data': { },
        'to'                        : '/topics/table1',
        'priority'                  : 'high',
        'restricted_package_name'   : ''
    }
    this.sendMessage(data);
  }

  sendMessageToCounter() {
    const data = {
      'notification': {
        'title'                     : 'Request for bill out',
        'body'                      : 'customer is requesting for bill out',
      },
      'data': { },
        'to'                        : '/topics/counter',
        'priority'                  : 'high',
        'restricted_package_name'   : ''
    }
    this.sendMessage(data);
  }
}
