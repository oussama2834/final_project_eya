import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendrierService } from '../service/calendrier.service';
import { CrudService } from 'app/service/crud.service';
import { Etudiant } from 'app/Model/etudiant.model';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  date: Date = new Date();
  message = ""
  data: any;
  idEtudiant!: number;
  etudiant = new Etudiant();
  constructor(private servicecrud :CrudService , public service: CalendrierService, private route: ActivatedRoute, private router: Router) { }

  id: any

   ngOnInit()  {
    // this.date = new Date()
     this.idEtudiant = Number(localStorage.getItem("idEtu"));
     this.servicecrud.findEtudiantById(this.idEtudiant).subscribe(res => {
       this.etudiant = res
       console.log(this.etudiant)
     })
    this.id = this.route.snapshot.params['id']
    console.log(this.id)
     this.service.getByIdsession(this.id).subscribe({
      next: (res: any) => {
        this.data = res;
        console.log(this.data)
      },
      error: (err: any) => {
        console.log(err)
      }

    })

  }



}
