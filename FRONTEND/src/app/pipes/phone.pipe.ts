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
      case "Allemagne" : //Allemagne
        prefix = "0049";
        break;
      case "Autriche" : //Autriche
        prefix = "0043";
        break;
      case "Belgique" : //Belgique
        prefix = "0032";
        break;
      case "Danemark" : //Danemark
        prefix = "0045";
        break;     
      case "Espagne" : //Espagne
        prefix = "0034";
        break;
      case "France" : //France
        prefix = "0033";
        break;
      case "Grèce" : //Grèce
        prefix = "0030";
        break;
      case "Hongrie" : //Hongrie
        prefix = "0036";
        break;
      case "Italie" : //Italie
        prefix = "0039";
        break;
      case "Luxembourg" : //Luxembourg
        prefix = "00352";
        break;
      case "Norvège" : //Norvège
        prefix = "0047";
        break;
      case "Pays-Bas" : //Pays-Bas
        prefix = "0031";
        break;
      case "Pologne" : //Pologne
        prefix = "0048";
        break;
      case "Portugal" : //Portugal
        prefix = "00351";
        break;
      case "Roumanie" : //Roumanie
        prefix = "0040";
        break;
      case "Royaume-Uni" : //Royaume-Uni
        prefix = "0044";
        break;
      case "Suède" : //Suède
        prefix = "0046";
        break;
      case "Suisse" : //Suisse
        prefix = "0041";
        break;
      default :
        prefix = "";
    }

    let phoneNumberTruncate : string = user.phoneNumber.substr(1);

    return `${prefix}${phoneNumberTruncate}`;
  }

}
