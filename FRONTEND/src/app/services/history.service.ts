import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  
  

  getClientHistory(login: string) : Observable<Order[]> {
    let data : string = "login=" + login;
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<Order[]>("https://tp-bdd.herokuapp.com/api/getClientHistory", data, httpOption);
  }


  saveOrder(order : Order): Observable<any> {
    let body = new URLSearchParams();
    body.set("order", JSON.stringify(order));
    let httpOption = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    };
    return this.http.post<any>("https://tp-bdd.herokuapp.com/api/saveOrder", body.toString(), httpOption);
  }

  constructor(private http:HttpClient) { }
}
