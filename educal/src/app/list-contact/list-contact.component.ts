import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../Model/Admin.model';
import { CrudService } from '../service/crud.service';
import { Contact } from '../Model/Contact.model';
@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent {


  Listcontact:Contact[]
  constructor(private service:CrudService){}


  ngOnInit(): void {

    this.service.getContacts().subscribe(contacts => {
      this.Listcontact =  contacts
      console.log(this.Listcontact);
    })
  }
  onDeleteContact(contact :Contact) {
    if(confirm("Voulez vous supprimer ce contact?")) {

      // this.service.deleteContact(contact.id).subscribe(() => {
      //   // this.router.navigate(['/Listcontact']).then(() => {
      //   //   window.location.reload()
      //   // })
      // })
    }
  }


}
