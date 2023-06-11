import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Admin } from '../Model/Admin.model';
import { CrudService } from '../service/crud.service';
import { Etudiant } from 'app/Model/etudiant.model';
@Component({
  selector: 'app-ajouteretudiant',
  templateUrl: './ajouteretudiant.component.html',
  styleUrls: ['./ajouteretudiant.component.css']
})
export class AjouteretudiantComponent {
  etudiant = new Etudiant();
  cinexist = false
  emailexist = false
  etudiantForm: FormGroup
  save(){}

  newEtudiant=new Etudiant()
  public message!: string;
  constructor(private router : Router,private services : CrudService, private toast:NgToastService ,private fb :FormBuilder) {
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
              Validators.minLength(8)]),

        mdp: new FormControl('',[
          Validators.required,Validators.minLength(6)]) }
     this.etudiantForm = this.fb.group(formControls)
   }
   get nom() {return this.etudiantForm.get('nom');}
  get prenom() { return this.etudiantForm.get('prenom');}
  get email() {return this.etudiantForm.get('email');}
  get adresse() { return this.etudiantForm.get('adresse');}
  get cin() {return this.etudiantForm.get('cin');}
  get mdp() {return this.etudiantForm.get('mdp');}


  //  addNewEtudiant() {
  //   let data = this.etudiantForm.value;
  //   console.log(data);
  //   let etudiant = new Etudiant(
  //    undefined, data.nom,data.prenom,data.email,data.adresse,data.cin,data.mdp);
  //   console.log(etudiant);

  //   if (
  //     data.nom == 0 ||
  //     data.prenom == 0||
  //     data.email == 0||
  //     data.adresse == 0||
  //     data.cin == 0||
  //     data.mdp == 0
  //   ) {
  //     this.toast.info({
  //       detail: 'Error Message',
  //       summary: 'Remplir tous champs',
  //     });
  //   // } else {
  //   // this.services.addetudiant(etudiant).subscribe
  //   //   (res=>{
  //   //     console.log(res);
  //   //     this.toast.success({
  //   //       detail: 'Succes Message',
  //   //       summary: 'Message est Envoyée',
  //   //     });

  //   //     // this.router.navigate(['/Listetudiant']);
  //   //   },
  //   //           err=>{
  //   //     console.log(err);
  //   //     this.toast.error({

  //   //       summary: 'Champs invalide',
  //   //     }); }
  //   // )

  //    }
  // }

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
      data.prenom == 0||
      data.email == 0||
      data.adresse == 0||
      data.cin == 0||
      data.mdp == 0 ||
      this.cinexist == true ||
      this.emailexist == true
    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
    this.services.registEtudiant(etudiant).subscribe
      (res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'Message est Envoyée',
        });

        this.router.navigate(['/listEtudiant']);
      },
      err=>{
        this.message=`<div class="alert alert-warning" role="alert">
       Essayez de nouveau !
      </div>`
      setTimeout(() => {
        this.message=""
      }, 3000);

     }
    )

    }
  }



}

