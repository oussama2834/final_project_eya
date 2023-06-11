import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../Model/Admin.model';
import { Enseignant } from '../Model/Enseignant.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-list-enseignant',
  templateUrl: './list-enseignant.component.html',
  styleUrls: ['./list-enseignant.component.css']
})
export class ListEnseignantComponent {
  listEnseignants: Enseignant[];
  enseignant = new Enseignant();
  id !: number;
  constructor(private service:CrudService){}
  getEnseignant(id:number,enseignant:Enseignant) {
    this.enseignant = enseignant;
    this.id = id;
    console.log(this.id)
    console.log(this.enseignant)
  }

  ngOnInit(): void {

    this.service.getEnseignant().subscribe(enseignants => {
      this.listEnseignants = enseignants
      console.log(this.listEnseignants)

    })
  }
  modifierenseignant(){
    this.service.editEnseignant(this.id, this.enseignant).subscribe(res => {
      console.log(res)
    })
  }

  onDeleteEnseignat(enseignant : Enseignant) {
    if(confirm("Voulez vous supprimer cet enseignant?")) {

      this.service.deleteEnseignant(enseignant.id).subscribe((res) => {
        console.log(res)
        // this.router.navigate(['/Listenseignant']).then(() => {
        //   window.location.reload()
        // })
      })
      this.listEnseignants = this.listEnseignants.filter(ens => ens.id != enseignant.id)
    }
  }
updateensetat(ense:Enseignant){
    console.log(ense);

    let index=this.listEnseignants.indexOf(ense);
    if(ense.etat==true)
    {
      let newEnseignant = new Enseignant(ense.id, ense.nom, ense.prenom, ense.email,
        ense.adresse, ense.telephone, ense.mdp)

  this.service.updateEnseignant(newEnseignant,ense.id).subscribe
  (
    res=>{console.log(res)
    this.listEnseignants[index]=newEnseignant
    },
    err=>console.log(err)
  )
    }

    else{

      let newEnseignant=new Enseignant
      (ense.id,ense.nom,ense.prenom,ense.email,ense.adresse,ense.telephone,ense.mdp)
      this.service.updateEnseignant(newEnseignant,ense.id).subscribe
    (
      res=>{console.log(res)
      this.listEnseignants[index]=newEnseignant
      },
      err=>console.log(err)
    )

    }



  }

}
