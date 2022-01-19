import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserConnected } from '../models/userConnected.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {

  URL_API_LOGIN : string = "https://tp-bdd.herokuapp.com/api/login" as const;
  // URL_API_AUTH : string = "https://tp-bdd.herokuapp.com/api/auth" as const;
  URL_API_CREATE_USER : string = "https://tp-bdd.herokuapp.com/api/create_user" as const;

  constructor(private http : HttpClient) { 

  }

  PostLogin(login : string, password : string) : Observable<User> {
    let data : string = "login=" + login + "&password=" + password;
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<User>(this.URL_API_LOGIN, data, httpOption);
  }

  CreateUser(civility : string, lastname : string, firstname : string, adress : string, cp : number, city : string, country : string, phoneNumber : string, email : string, login : string, password : string) : Observable<User> {
    let data : string = "civility=" + civility + "&lastname=" + lastname + "&firstname=" + firstname + "&adress=" + adress + "&postCode=" + cp + "&city=" + city + "&country=" + country + "&phoneNumber=" + phoneNumber + "&email=" + email + "&login=" + login + "&password=" + password; 
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    return this.http.post<User>(this.URL_API_CREATE_USER, data, httpOption);
  }

}
