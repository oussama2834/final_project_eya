import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { CalendrierComponent } from 'app/calendrier/calendrier.component';
import { SessionCours } from 'app/Model/SessionCour.model';
import { Cour } from 'app/Model/Cour.model';
import { Enseignant } from 'app/Model/Enseignant.model';
import { Reservation } from 'app/Model/Reservation';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-reservationsenseignant',
  templateUrl: './reservationsenseignant.component.html',
  styleUrls: ['./reservationsenseignant.component.css']
})
export class ReservationsenseignantComponent {
  reservations: Reservation[] = [];
  reservationsForstudent: Reservation[] = [];
  reservationsforEns: Reservation[] = [];
  isEtu:boolean=false //mta deconnexion
  isEns:boolean=false //mta deconnexion
  totalCour: number = 0
  idEtudiant !: number;
  idEnseignant !: number;
  idAdmin !: number;
  constructor(private service: CrudService,private toast:NgToastService) { }
  ngOnInit() {
    this.idEnseignant = Number(localStorage.getItem("idEns"));
    this.idEtudiant = Number(localStorage.getItem("idEtu"));

    console.log(this.reservationsForstudent);
    console.log(this.idEtudiant)
    console.log(this.idEnseignant)
    console.log(this.test());
    console.log(this.isEtu)
    console.log(this.isEns)
  this.service.getAllreservations().subscribe(
  data =>{
      this.reservations = data;
      console.log(this.reservations)
      this.reservationsforEns = this.reservations.filter(res => res.sessionCours.enseignant.id == this.idEnseignant)
      this.reservationsForstudent =
        this.reservations.filter(res => res.etudiant.id === this.idEtudiant)
    console.log(this.reservationsforEns)
    console.log(this.reservationsForstudent)
  }
  )
  }
  test() {
    if(this.idEnseignant){
      this.isEns=true
      }
      else{
      this.isEns=false
    }
    if (this.idEtudiant) {
      this.isEtu = true

      }
      else{
      this.isEtu = false

    }


  }

  valider(id:number) {
    this.service.validerReservation(id).subscribe(res => console.log(res))
    this.toast.success({
      summary: 'validation réussie',
    });
  }
  refuser(id:number) {
    this.service.annulerReservation(id).subscribe(res => console.log(res))
    this.reservations = this.reservations.filter(res => res.id != id);
    this.toast.error({
      summary: 'Refus réussi',
    });
  }
}
