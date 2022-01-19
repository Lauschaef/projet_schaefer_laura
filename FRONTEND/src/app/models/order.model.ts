import { Book } from "src/app/models/book.model";
import { OrderContent } from "./orderContent.model";

export class Order {

    idOrder : number;
    date : Date;
    content : OrderContent[] = [];

    constructor (idOrder : number, date : Date, content : OrderContent[]){
        this.idOrder = idOrder;
        this.date = date;
        this.content = content;
    }
}
