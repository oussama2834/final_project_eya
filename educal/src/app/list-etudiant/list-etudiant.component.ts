import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../Model/Admin.model';
import { CrudService } from '../service/crud.service';
import { Etudiant } from 'app/Model/etudiant.model';
@Component({
  selector: 'app-list-etudiant',
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css']
})
export class ListEtudiantComponent {
  listEtudiants: Etudiant[]
  etudiant = new Etudiant();
  id !: number;
  constructor(private service:CrudService){}
  getEtudiant(id:number,etudiant:Etudiant) {
    this.etudiant = etudiant;
    this.id = id;
  }

  ngOnInit(): void {

    this.service.getEtudiant().subscribe(etudiants => {
      this.listEtudiants = etudiants

    })

}
modifieretudiant(){
  this.service.editEtudiant(this.id, this.etudiant).subscribe(res => {
    console.log(res)
  })
}

onDeleteEtudiant(etudiant : Etudiant) {
  if(confirm("Voulez vous supprimer cet etudiant ?")) {

    this.service.deleteEtudiant(etudiant.id).subscribe((res) => {
   console.log(res)
    })
    this.listEtudiants = this.listEtudiants.filter(et => et.id != etudiant.id )
  }
}


}


