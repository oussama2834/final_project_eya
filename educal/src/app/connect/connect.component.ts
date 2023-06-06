import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent {
  totalCour:number=0
  constructor(private service:CrudService){  
  }
  ngOnInit():void{ /*ye7seb 9adech w y7ot f dashboard*/
    this.service.getCour().subscribe(cour =>{
      this.totalCour=cour.length})
   
  }
}
