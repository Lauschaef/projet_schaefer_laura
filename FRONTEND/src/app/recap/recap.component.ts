import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { User } from '../models/user.model';
import { Select, Store } from '@ngxs/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VariablesGlobales } from '../variablesGlobales';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {

  user : User = new User("","","","","","","","","","","");
  //adresses : Observable<string>;
  //adressForm: FormGroup  = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private router: Router, private formService: FormService, private store : Store, private param: VariablesGlobales) { 
    // this.adresses = this.store.select(state => state.adresses.adresses);
    // this.adressForm = this.formBuilder.group({
    //   adress: ''
    // });
  }

  deconnexion(){
    this.router.navigate(["/catalogue/connexion"]);
    this.param.userConnected = new User("","","","","","","","","","","");
    this.param.userIsConnected = false;
  }

  //@Select(AdressState.getAdresses) adresses$: Observable<string[]> | undefined;

  // addAdress(){
  //   let adress: string = this.adressForm.value['adress'];
  //   this.store.dispatch(new AddAdress(adress));

  //   this.adressForm = this.formBuilder.group({
  //     adress: ''
  //   });

  // }

  // deleteAdress(adress: string){
  //   this.store.dispatch(new DeleteAdress(adress));
  // }

  ngOnInit(): void {
    this.user = this.param.userConnected;
  }

}
