import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Admin } from '../Model/Admin.model';
import { Enseignant } from '../Model/Enseignant.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-ajouterenseignant',
  templateUrl: './ajouterenseignant.component.html',
  styleUrls: ['./ajouterenseignant.component.css']
})
export class AjouterenseignantComponent {

 enseignantForm:FormGroup

  newAdmin=new Enseignant()
  public message!: string;
  constructor(private services : CrudService , private toast:NgToastService,private router:Router,private fb :FormBuilder) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),

      prenom: new FormControl('',[
        Validators.required,]),
        email: new FormControl('',[
          Validators.required,
        Validators.email]),

      adresse: new FormControl('',[
        Validators.required,]),

        telephone: new FormControl('',[
          Validators.required,
        Validators.pattern("[0-9]{8}"
        ),Validators.maxLength(9)]),

        mdp: new FormControl('',[
          Validators.required,])}
     this.enseignantForm = this.fb.group(formControls)
   }
   get nom() {return this.enseignantForm.get('nom');}
  get prenom() { return this.enseignantForm.get('prenom');}
  get email() {return this.enseignantForm.get('email');}
  get adresse() {return this.enseignantForm.get('adresse');}
  get telephone() {return this.enseignantForm.get('telephone');}
  get mdp() {return this.enseignantForm.get('mdp');}


   addNewEnseignant() {
    let data = this.enseignantForm.value;
    console.log(data);
    let enseignant = new Enseignant(
     undefined, data.nom,data.prenom,data.email,data.adresse,data.telephone,data.mdp);
    console.log(enseignant);

    if (
      data.nom == 0 ||
      data.prenom == 0||
      data.email == 0||
      data.adresse == 0||
      data.telephone == 0||
      data.mdp == 0

    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
    this.services.addenseignant(enseignant).subscribe(
      res=>{



        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'Message est Envoyée',
        });

         this.router.navigate(['/listEnseignant']);
      },
      err=>{
        console.log(err);
        this.toast.error({

          summary: 'Champs invalide',
        }); }
    )

    }
  }




}


