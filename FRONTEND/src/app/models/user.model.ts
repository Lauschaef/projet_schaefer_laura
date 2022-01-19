export class User {
    
    civility : string;
    lastname : string;
    firstname : string;
    adress : string;
    cp : string;
    city : string;
    country : string;
    phoneNumber : string;
    email : string;
    login : string;
    password : string;

    constructor (civility : string, lastname : string, firstname : string, adress : string, cp : string, city : string, country : string, phoneNumber : string, email : string, login : string, password : string){
        this.civility = civility;
        this.lastname = lastname;
        this.firstname = firstname;
        this.adress = adress;
        this.cp = cp;
        this.city = city;
        this.country = country
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.login = login;
        this.password = password;
    }
}
