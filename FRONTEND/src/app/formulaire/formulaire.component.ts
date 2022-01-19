import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../services/form.service';
import { VariablesGlobales } from '../variablesGlobales';
import { MustMatch } from '../helpers/must-match.validator';
import { ApiLoginService } from '../services/api-login.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css']
})
export class FormulaireComponent implements OnInit {

  accountCreationForm : FormGroup = new FormGroup({});
  submitted = false;
  loginUsed = false;

  constructor(private formbuilder: FormBuilder, private formService: FormService, private router: Router, private param: VariablesGlobales, private api:ApiLoginService) { }

  ngOnInit(): void {
    this.accountCreationForm = this.formbuilder.group({
      civility : ['', Validators.required],
      lastname : ['', Validators.required],
      firstname : ['',Validators.required],
      adress : ['', Validators.required],
      cp : ['', [Validators.required, Validators.pattern(/[0-9]{2} ?[0-9]{3}/)]],
      city : ['', Validators.required],
      country : ['', Validators.required],
      phoneNumber : ['',[Validators.required, Validators.pattern(/[0-9]{2}[ \.\-]?[0-9]{2}[ \.\-]?[0-9]{2}[ \.\-]?[0-9]{2}[ \.\-]?[0-9]{2}/)]],
      email : ['', [Validators.required, Validators.email ]],
      login : ['', Validators.required],
      password : ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-z^A-Z^0-9]).{8,}$/)]],
      passwordConfirmation : ['', Validators.required]
    }, {
      validator: MustMatch('password', 'passwordConfirmation')
    })
  }

  onSubmit(){

    this.submitted = true;


    if (this.accountCreationForm.invalid) {
      return;
    }

    const civility = this.accountCreationForm.get('civility')?.value == 1 ? "Homme" : "Femme" ;
    const lastname = this.accountCreationForm.get('lastname')?.value;
    const firstname = this.accountCreationForm.get('firstname')?.value;
    const adress = this.accountCreationForm.get('adress')?.value;
    const cp = this.accountCreationForm.get('cp')?.value;
    const city = this.accountCreationForm.get('city')?.value;    
    const country = this.accountCreationForm.get('country')?.value;
    const phoneNumber = this.accountCreationForm.get('phoneNumber')?.value;
    const email = this.accountCreationForm.get('email')?.value;
    const login = this.accountCreationForm.get('login')?.value;
    const password = this.accountCreationForm.get('password')?.value;

    this.formService.submit(civility, lastname, firstname, adress, cp, city, country, phoneNumber, email, login, password);
    
    this.api.CreateUser(civility, lastname, firstname, adress, cp, city, country, phoneNumber, email, login, password).subscribe(
      (data : User)=>{
        this.param.userIsConnected = true;
        this.param.userConnected = data;
        this.router.navigate(["/catalogue/recap"]);
      },
      (error:any)=>{
        if(error.status == 403){
          this.loginUsed = true;
        }
      }
    );
  }
}
