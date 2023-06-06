

import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendrierService } from '../service/calendrier.service';
@Component({
  selector: 'app-validate-reservation',
  templateUrl: './validate-reservation.component.html',
  styleUrls: ['./validate-reservation.component.css']
})
export class ValidateReservationComponent implements OnInit {

  listReservation:any=[]
  constructor(private calendrierService:CalendrierService) { }
  
  reflech=new Subject<void>()
  ngOnInit(): void {
    this.getAll();
    this.reflech.subscribe(()=>{
      this.getAll();
    })
  }
  getAll()
  {
    this.calendrierService.getAllSessionbyEnsId().subscribe((data:any)=>{
      console.log(data)
      this.listReservation=data;
    })
  }
  valider(event:any)
  { 
    console.log(event)
    let rq:any={}
    rq.idSession=event.id
    rq.etat=1
    this.calendrierService.validerOuAnnulerFromApi(rq).subscribe(()=>{
      this.reflech.next()
    })
   }
  annuler(event:any)
  {
    console.log(event)
   
    this.calendrierService.annuler(event.id).subscribe(()=>{
      this.reflech.next()
    })
  }
 
  
}
