import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class GlobalProvider {
  
  tableId   = new BehaviorSubject(1);
  orders    = new BehaviorSubject([]);

  constructor(public http: HttpClient) { }

  putOrder(product, quantity) {
    this.orders.getValue().forEach((order,index) =>{
      if( order.product.id === product.id ) {
        quantity = (+quantity + +order.quantity);
        this.removeOrder(index);
      }
    });
    this.orders.next(this.orders.getValue().concat(
      {
        'quantity'  : +quantity,
        'product'   : product
      }
    ));
  }

  removeOrder(orderIndex) {
    let orderArr: any[] = this.orders.getValue();
    orderArr.forEach((item, index) => {
        if(index === orderIndex) { orderArr.splice(index, 1); }
    });
    this.orders.next(orderArr);
  }
}
