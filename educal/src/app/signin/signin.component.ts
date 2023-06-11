import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Enseignant } from '../Model/Enseignant.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

loginForm: FormGroup
constructor(
  private fb: FormBuilder,
  private service:CrudService,
  private router:Router,private toast:NgToastService
) {
  let formControls = {
    email: new FormControl('',[
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')

    ]),
    mdp: new FormControl('',[
      Validators.required,

    ])
  }

  this.loginForm = this.fb.group(formControls)
}

get email() { return this.loginForm.get('email') }
get mdp() { return this.loginForm.get('mdp') }

login() {
  let data = this.loginForm.value;
  console.log(data);
  let enseignant = new Enseignant(
   null, null,null,data.email,null,null,data.mdp,null,null);
  console.log(Enseignant);
  if (data.email == 0 ||
    data.mdp == 0) {
    this.toast.info({
      detail: 'Error Message',
      summary: 'Remplir votre champs',
    });
  }
  else if (this.loginForm.valid) {
    console.log('valid form')
    if (data.email == "admin@gmail.com" && data.mdp == "adminadmin") {
      this.router.navigate(['/listEnseignant'])
    } else { 
    this.service.loginEns(enseignant)
  }
  

  } else {
    console.log('invalid form')
  this.toast.info({
    detail: 'Error Message',
    summary: 'Vérifiez bien ',
  });
}
  }





}
