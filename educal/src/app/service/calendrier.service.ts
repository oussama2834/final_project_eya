import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {
  private _reflechReserve=new Subject<void>();

  get reflechReserve() {
    return this._reflechReserve;
  }
    httpOptions ={
    headers: new HttpHeaders ({'Content-Type': 'application/json'}) 
  }

  
  constructor(private http : HttpClient) { }

  
  addSession(rq:any){
    return this.http.post<any>( "http://localhost:8081/api/sessionCour/"+ localStorage.getItem("idEns"),rq, this.httpOptions);
  }
  miseAjourSession(rq:any){
    return this.http.put<any>( "http://localhost:8081/api/sessionCour/mise-a-jour" ,rq, this.httpOptions);
  }
  suppimerSession(id:any){
    return this.http.delete<any>( "http://localhost:8081/api/sessionCour/"+id, this.httpOptions);
  }
  getAllSession(){
    return this.http.get<any>( "http://localhost:8081/api/sessionCour" , this.httpOptions);
  }
  getAllSessionCoursByEns(){
    return this.http.get<any>( "http://localhost:8081/api/sessionCour/get-by-id-ens/"+ localStorage.getItem("idEns") , this.httpOptions);
  }
  getAllSessionbyEnsId(){
    return this.http.get<any>( "http://localhost:8081/api/reservation/get-all-by-id-enseignant/"+localStorage.getItem("idEns") , this.httpOptions);
  }
  getAllReservationbyEtudientId(){
    return this.http.get<any>("http://localhost:8081/api/reservation/get-all-by-id-etudient/" +
      localStorage.getItem("idEtu"), this.httpOptions);
  }
  // getAllReservationbyEtudientId() {
  //   return this.http.get<any>("http://localhost:8081/api/reservation/get-all-by-id-etudient/" +
  //     localStorage.getItem("idEtu"), this.httpOptions);
  // }
  reserverFromApi(rq:any){
     return this.http.post<any>( "http://localhost:8081/api/reservation" ,rq ,this.httpOptions);
  }
  validerOuAnnulerFromApi(rq:any){
    return this.http.put<any>( "http://localhost:8081/api/reservation/validate-reservation" ,rq ,this.httpOptions);
  }
  getById(id:number){
    return  this.http.get("http://localhost:8081/api/reservation/"+id , this.httpOptions)
  }
  getByIdsession(id: number) {
    return  this.http.get("http://localhost:8081/api/sessionCour/"+id , this.httpOptions)
  }
  annuler(id:any){
    return this.http.put("http://localhost:8081/api/reservation/annuler/"+id,{},this.httpOptions);
  }
 
} 
