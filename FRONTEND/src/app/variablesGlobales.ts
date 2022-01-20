import { Injectable } from "@angular/core";
import { User } from "./models/user.model";

@Injectable()

export class VariablesGlobales {
    userIsConnected : boolean = false;
    userConnected : User = new User("d","","","","","","","","","","");
}