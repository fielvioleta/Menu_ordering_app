import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class GlobalProvider {
  
  orders = new BehaviorSubject(null)

  constructor(public http: HttpClient) { }

  putOrder(product, quantity) {
    
  }
}
