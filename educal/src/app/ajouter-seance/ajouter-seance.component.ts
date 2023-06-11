import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { CalendrierComponent } from 'app/calendrier/calendrier.component';
import { SessionCours } from 'app/Model/SessionCour.model';
import { Cour } from 'app/Model/Cour.model';
import { Enseignant } from 'app/Model/Enseignant.model';
import { Reservation } from 'app/Model/Reservation';
import { Etudiant } from 'app/Model/etudiant.model';
import { NgToastService } from 'ng-angular-popup';
// import { CalendrierComponent } from '../calendrier/calendrier.component';

@Component({
  selector: 'app-ajouter-seance',
  templateUrl: './ajouter-seance.component.html',
  styleUrls: ['./ajouter-seance.component.css']
})
export class AjouterSeanceComponent implements AfterViewInit {
  seances: SessionCours[] = [];
  seancesParEns: SessionCours[] = [];
  cours: Cour[] = []
  seance = new SessionCours();
  seance_edited = new SessionCours();
  IsAvailableplaces :boolean;
  id !: number;
  enseignant !: Enseignant
  isEtu: boolean = false //mta deconnexion
  isEns: boolean = false //mta deconnexion
  idEtudiant !: number;
  idEnseignant !: number;
  totalCour: number = 0
  idAdmin !: number;
  reservation = new Reservation();
  etudiant = new Etudiant();
  _seance = new SessionCours();
  showmodal = false
  reservations: Reservation[] = [];
  reservationsForstudent: Reservation[] = [];
  constructor(private service: CrudService,private toast:NgToastService) { }

  @ViewChild(CalendrierComponent) child: CalendrierComponent | any;
  getSeance(c: SessionCours) {
    this._seance = c;
    this.service.isAvailableplaces(c.id).subscribe(res => {
      this.IsAvailableplaces = res
      console.log(this.IsAvailableplaces)
      if (!this.IsAvailableplaces) {
        this.toast.error({
          summary: "il n'ya pas encore des places disponibles",
        });
     }
    })

  }

  ngAfterViewInit() {
    console.log("event", this.child.events) // I am a child component!
    this.child.refresh.subscribe(() => {
      console.log("in ref", this.child.events)
    })
  }

  save() {

    console.log(this.seance)
    this.service.addSession(this.seance, this.idEnseignant).subscribe(
      res => {
        console.log(res)
        this.ngOnInit();
      }

    )
  }
  rejoindre() {
    this.reservation.sessionCours = this._seance;
    this.reservation.etudiant = this.etudiant;
    this.reservation.sessionCours.nbr_places++;
    console.log(this.reservation)

    this.service.reserverFromApi(this.reservation,this._seance.id).subscribe(res => {
      console.log(res)
      this.toast.success({
        summary: 'votre demande a été réussie',
      });
    })
  }
  ngOnInit() {
    this.service.getAllreservations().subscribe(
      data =>{
          this.reservations = data;
          console.log(this.reservations)
          this.reservationsForstudent =
            this.reservations.filter(res => res.etudiant.id === this.idEtudiant)

      }
      )
    this.idEnseignant = Number(localStorage.getItem("idEns"));
    this.idEtudiant = Number(localStorage.getItem("idEtu"));
    console.log(this.idEtudiant)
    console.log(this.idEnseignant)
    console.log(this.test());
    console.log(this.isEtu)
    console.log(this.isEns)

    this.id = Number(localStorage.getItem("idEns"));
    console.log(this.id);
    this.service.findEnseignantById(this.id).subscribe(res => {
      this.enseignant = res
      console.log(this.enseignant)
    })
    this.service.findEtudiantById(this.idEtudiant).subscribe(res => {
      this.etudiant = res
    })
    this.service.getSessionCours().subscribe(
      res => {
        this.seances = res;
        this.seancesParEns = this.seances.filter(s => s.enseignant.id == this.idEnseignant)
        console.log(this.seances)
        console.log(this.seancesParEns)
      }
    )
    this.service.getCour().subscribe(
      res => {
        this.cours = res;
        this.cours = this.cours.filter(c => c.enseignant.id == this.idEnseignant )
        console.log(this.cours)
      }
    )
  }
  delete(id:number){
  this.service.deleteSessionCours(id).subscribe(
    res => {console.log(res)}
  )
  this.seancesParEns = this.seancesParEns.filter(s => s.id != id);
  }
  getSessioncours (c:SessionCours){
  this.seance_edited = c ;
  }
  edit(){
    this.service.miseAjourSession(this.seance_edited).subscribe(
      res =>{
       console.log(res);
       this.ngOnInit();
      }
      )

  }

  test() {
    if (this.idEnseignant) {
      this.isEns = true
    }
    else {
      this.isEns = false
    }
    if (this.idEtudiant) {
      this.isEtu = true

    }
    else {
      this.isEtu = false

    }
  }
}
