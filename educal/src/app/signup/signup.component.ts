import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Enseignant } from '../Model/Enseignant.model';
import { DomaineEtude } from '../Model/DomaineEtude.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  emailexist = false;
  ngOnInit() {

  }
  public message: string=""; //message utilisateur existe

      cv: any;

  enseignantForm:FormGroup

  newEnseignant=new Enseignant()
  constructor(private services : CrudService , private router : Router,private fb:FormBuilder, private toast:NgToastService) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),

      prenom: new FormControl('',[
        Validators.required,]),
      email: new FormControl('',[
        Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]),

          adresse: new FormControl('',[
            Validators.required,]),
            telephone: new FormControl('',[
              Validators.required, Validators.pattern('^[0-9]{8}$')]),

        mdp: new FormControl('',[
          Validators.required,Validators.minLength(6)]) ,
          cv: new FormControl('',[
            Validators.required,]) }
     this.enseignantForm = this.fb.group(formControls)
   }
   get nom() {return this.enseignantForm.get('nom');}
  get prenom() { return this.enseignantForm.get('prenom');}
  get email() {return this.enseignantForm.get('email');}
  get adresse() { return this.enseignantForm.get('adresse');}
  get telephone() {return this.enseignantForm.get('telephone');}
  get mdp() {return this.enseignantForm.get('mdp');}


   addNewEnseignant() {
    let data = this.enseignantForm.value;
    console.log(data);
    let enseignant = new Enseignant(
     undefined, data.nom,data.prenom,data.email,data.adresse,data.telephone,data.mdp,this.cv,false);
    console.log(enseignant);
     this.services.emailEnseignantExist(data.email).subscribe( res =>
     {
       this.emailexist = res
       console.log(this.emailexist)
       if (
        data.nom == 0 ||
        data.prenom == 0||
        data.email == 0||
        data.adresse == 0||
        data.telephone == 0||
        data.mdp == 0||
        this.cv == 0 ||
        this.emailexist == true
  
    ) {
  
        this.toast.info({
          detail: 'Error Message',
          summary: 'Remplir votre champs',
        });
      } 
      else  {
      
      this.services.addenseignant(enseignant).subscribe
        (res=>{
          console.log(res);
          this.toast.success({
            detail: 'Succes Message',
            summary: 'Message est Envoyée',
          });
  
          this.router.navigate(['/signin']);
        },
        err=>{
          this.message=`<div class="alert alert-warning" role="alert">
          Inscription échouée !
        </div>`
        setTimeout(() => {
          this.message=""
        }, 3000);
  
       }
      )
  
      }

   })
   
  }

  recuperPhoto(fileInput: any) {
    this.cv = fileInput.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.cv);
    fileReader.onload = (e: any) => {
      console.log('fileReader.result');
      this.cv = fileReader.result;
      this.newEnseignant.cv=this.cv;
      console.log(this.newEnseignant.cv)
    };

  }



}
