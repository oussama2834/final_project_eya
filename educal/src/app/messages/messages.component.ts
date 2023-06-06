import { Component } from '@angular/core';
import { Contact } from 'app/Model/Contact.model';
import { CrudService } from 'app/service/crud.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  p: number = 1;
  collection: any[] = [];
  messages: Contact[] = [];
  constructor(private service : CrudService,private toast:NgToastService) { }
  ngOnInit() {
    this.service.getContacts().subscribe(
      res => {
        this.messages = res;
        console.log(this.messages)

      }
    )
  }
  delete(id:number) {
    this.service.deletecontact(id).subscribe(res => {
      console.log(res)
      this.toast.success({
        summary: 'suppression réussie',
      });
    },
      error => {
        this.toast.error({
          summary: 'suppression échouée',
        });
      }
    )
    this.messages = this.messages.filter(msg => msg.id != id)
  }
}
