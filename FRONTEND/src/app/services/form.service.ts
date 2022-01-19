import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  user : User = new User("","","","","","","","","","","");

  constructor() { }

  submit(civility : string, lastname: string, firstname: string, adress:string, cp:string, city:string, country : string , phoneNumber: string, email: string, login:string, password:string){
    this.user = new User(civility, lastname, firstname, adress, cp, city, country, phoneNumber, email, login, password);
  }
}
