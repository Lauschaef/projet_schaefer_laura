import { Injectable } from "@angular/core";
import { User } from "./models/user.model";

@Injectable()

export class VariablesGlobales {
    //formSubmitted : boolean = false ;
    userIsConnected : boolean = false;
    userConnected : User = new User("d","","","","","","","","","","");
}