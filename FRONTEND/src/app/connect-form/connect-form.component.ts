import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ApiLoginService } from '../services/api-login.service';
import { VariablesGlobales } from '../variablesGlobales';

@Component({
  selector: 'app-connect-form',
  templateUrl: './connect-form.component.html',
  styleUrls: ['./connect-form.component.css']
})
export class ConnectFormComponent implements OnInit {

  connectForm : FormGroup = new FormGroup({});
  submitted = false;
  loginOrPasswordFailed = false;

  constructor(private formbuilder: FormBuilder, private router: Router, private api:ApiLoginService, private param: VariablesGlobales) { }

  ngOnInit(): void {
    this.connectForm = this.formbuilder.group({
      login : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  onSubmit(){
    const login = this.connectForm.get('login')?.value;
    const password = this.connectForm.get('password')?.value;

    this.submitted = true;

    if (this.connectForm.invalid) {
      return;
    }

    this.api.PostLogin(login, password).subscribe(
      (data : User )=>{
        this.param.userIsConnected = true;
        this.param.userConnected = data;
        console.log(data);
        this.router.navigate(["/catalogue/recap"]);
      },
      (error)=>{
        if(error.status == 401){
          this.loginOrPasswordFailed = true;
        }
      }
    );
    
  }

}
