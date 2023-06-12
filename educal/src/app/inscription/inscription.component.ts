import { Component } from '@angular/core';
import { Etudiant } from '../Model/etudiant.model';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent {
  etudiantForm: FormGroup
  emailexist = false;
  cinexist = false;

  newEtudiant=new Etudiant()
  public message!: string;
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
            cin: new FormControl('',[
              Validators.required,
              Validators.pattern('^[0-9]{8}$')]),

        mdp: new FormControl('',[
          Validators.required,]) }
     this.etudiantForm = this.fb.group(formControls)
   }
   get nom() {return this.etudiantForm.get('nom');}
  get prenom() { return this.etudiantForm.get('prenom');}
  get email() {return this.etudiantForm.get('email');}
  get adresse() { return this.etudiantForm.get('adresse');}
  get cin() {return this.etudiantForm.get('cin');}
  get mdp() {return this.etudiantForm.get('mdp');}


   addNewEtudiant() {
    let data = this.etudiantForm.value;
    console.log(data);
    let etudiant = new Etudiant(
     undefined, data.nom,data.prenom,data.email,data.adresse,data.cin,data.mdp);
     console.log(etudiant);
     this.services.emailEtudiantExist(data.email).subscribe( res =>
      {
        this.emailexist = res
        console.log(this.emailexist)

     })
     this.services.CinEtudiantExist(data.cin).subscribe( res =>
      {
        this.cinexist = res
        console.log(this.emailexist)

     })


     if (
       data.nom == 0 ||
       data.prenom == 0 ||
       data.email == 0 ||
       data.adresse == 0 ||
       data.cin == 0 ||
       data.mdp == 0

     ) {
       this.toast.info({
         detail: 'Error Message',
         summary: 'Remplir votre champs',
       });
     } else {
       if (!this.cinexist && !this.emailexist) {
         this.services.registEtudiant(etudiant).subscribe
           (res => {
             console.log(res);
             this.toast.success({
               detail: 'Succes Message',
               summary: 'Message est Envoyée',
             });

             this.router.navigate(['/connexion']);
           },
             err => {
               this.message = `<div class="alert alert-warning" role="alert">
       Essayez de nouveau !
      </div>`
               setTimeout(() => {
                 this.message = ""
               }, 3000);

             }
           )

       }
     }
  }




}
