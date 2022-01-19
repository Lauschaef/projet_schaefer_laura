import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'phone'
})


export class PhonePipe implements PipeTransform {

  transform(user: User): string {
    if (user == null) {
      return "";
    }

    let prefix : string;

    switch(user.country){
      case "1" : //Allemagne
        prefix = "0049";
        break;
      case "2" : //Autriche
        prefix = "0043";
        break;
      case "3" : //Belgique
        prefix = "0032";
        break;
      case "4" : //Danemark
        prefix = "0045";
        break;     
      case "5" : //Espagne
        prefix = "0034";
        break;
      case "6" : //France
        prefix = "0033";
        break;
      case "7" : //Grèce
        prefix = "0030";
        break;
      case "8" : //Hongrie
        prefix = "0036";
        break;
      case "9" : //Italie
        prefix = "0039";
        break;
      case "10" : //Luxembourg
        prefix = "00352";
        break;
      case "11" : //Norvège
        prefix = "0047";
        break;
      case "12" : //Pays-Bas
        prefix = "0031";
        break;
      case "13" : //Pologne
        prefix = "0048";
        break;
      case "14" : //Portugal
        prefix = "00351";
        break;
      case "15" : //Roumanie
        prefix = "0040";
        break;
      case "16" : //Royaume-Uni
        prefix = "0044";
        break;
      case "17" : //Suède
        prefix = "0046";
        break;
      case "18" : //Suisse
        prefix = "0041";
        break;
      default :
        prefix = "";
    }

    let phoneNumberTruncate : string = user.phoneNumber.substr(1);

    return `${prefix}${phoneNumberTruncate}`;
  }

}
