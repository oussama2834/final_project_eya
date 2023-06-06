import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { Contact } from '../Model/Contact.model';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm:FormGroup
 
  newContact=new Contact()

  constructor(private services : CrudService , private router : Router,private fb:FormBuilder, private toast:NgToastService) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),
    
      email: new FormControl('',[
        Validators.required,]),
      sujet: new FormControl('',[
        Validators.required,]),
      
        message: new FormControl('',[
          Validators.required,])}
     this.contactForm = this.fb.group(formControls)
   }
   get nom() {return this.contactForm.get('nom');} 
  get email() { return this.contactForm.get('prenom');}
  get sujet() {return this.contactForm.get('email');}
  get message() {return this.contactForm.get('mdp');}

  
   addNewContacts() {
    let data = this.contactForm.value;
    console.log(data);
    let contact = new Contact(
     undefined, data.nom,data.email,data.sujet,data.message);
    console.log(contact);
    
    if (
      data.nom == 0 ||
      data.email == 0||
      data.sujet == 0||
      data.message == 0
    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
    this.services.addcontact(contact).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'Message est Envoyée',
        });
        
        this.router.navigate(['/contact']);
      },
      err=>{
        console.log(err);
        this.toast.error({
          detail: 'Error Message',
          summary: 'Probléme de Serveur',
        }); }
    )

    }
  }

}
