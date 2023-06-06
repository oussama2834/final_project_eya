import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component implements OnInit {

  constructor(public crudService:CrudService,private route:Router) { }
  isConnectedEtudient=false
  isConnectedEnsignant=false
  
  ngOnInit(): void {
 
    this.crudService.etudientConnect.subscribe(()=>{
     
      
      this.testLogin()
     
    })
    this.testLogin()
   
  }
  mesReservation()
  {
    this.route.navigate(['/mes-reservations'])   
  }
  validateReservation()
  {
    this.route.navigate(['/validate-reservations'])
  }
  calendrierEns()
  {
    this.route.navigate(['/ajouter-seance']) 
  }
  calendrierEtudient()
  {
    this.route.navigate(['/reserver-seance'])
  }
  
  deconnexion()
  {
    this.crudService.logout()
  }
  testLogin()
  {
    
    if(Number(localStorage.getItem("idEtu")))
    { 
      this.isConnectedEtudient=true
    }else{
       
      this.isConnectedEtudient=false
      
    }
    if(Number(localStorage.getItem("idEns")))
    {
      
      this.isConnectedEnsignant=true
     
      
    }else{
       
      this.isConnectedEnsignant=false
      
    }
    
  }

}