import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 import { NgToastService } from 'ng-angular-popup';
import { CalendrierService } from '../service/calendrier.service';


@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.css']
})
export class MyReservationComponent implements OnInit {
  listReservation:any=[]
  constructor(private calendrierService:CalendrierService , private toaster : NgToastService , private router : Router) { }
  
  ngOnInit(): void {
    this.calendrierService.getAllReservationbyEtudientId().subscribe((data:any)=>{
      console.log(data)
      this.listReservation=data;
    })
  }

  edition_facture(id:any){
      this.router.navigate(['/facture/'+id])
  }

}
