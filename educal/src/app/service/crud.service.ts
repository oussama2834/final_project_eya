import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../Model/Contact.model';
import { Enseignant } from '../Model/Enseignant.model';
import { Etudiant } from '../Model/etudiant.model';
import { Cour } from '../Model/Cour.model';
import { Observable, Subject } from 'rxjs';
import { DomaineEtude } from '../Model/DomaineEtude.model';
import { SpecialiteEtude } from '../Model/SpecialiteEtude.model';
import  jwt_decode from 'jwt-decode';
import { Route, Router } from '@angular/router';
import { SessionCours } from '../Model/SessionCour.model';
import { Reservation } from 'app/Model/Reservation';
import { NgToastService } from 'ng-angular-popup';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
//mta3 header 1
  private _etudientConnect= new Subject<void>();
  isConnected=false;

  get etudientConnect()
  {
    return this._etudientConnect
  }

  private _reflechReserve=new Subject<void>();

  get reflechReserve() {
    return this._reflechReserve;
  }
    httpOptions ={
    headers: new HttpHeaders ({'Content-Type': 'application/json'})
  }
  //deconnexion ens
     //isConnected= false


//mta3 deconnection
private _EnsConnect=new Subject<void>();
private _EtuConnect=new Subject<void>();
  /*url mta3 connexion enseignant w etudiant*/
  apiUrl="http://localhost:8081/api"
  loginEnseignantUrl="http://localhost:8081/api/enseignant/loginl"
  loginEtudiantUrl="http://localhost:8081/api/etudiant/login"
  constructor(private http:HttpClient,public router:Router,private toast:NgToastService) {
  }
 //deconnexion ens
 loginEns(enseignant:Enseignant){
  this.loginEnseignant(enseignant).subscribe((data:any) =>{
    console.log(data)
    var decoded : any = jwt_decode(data.token)
    console.log(decoded)
    this.loginEnsp(decoded.data)
    this._etudientConnect.next()
    this.toast.success({
      summary: 'Bienvenue',
    });
  }, 
  error => {
    console.log(error)
    this.toast.error({
      summary: 'Login echoué vérifiez bien votre mail et mot de passe',
    });
  }
  )
  
  
 }
 //deconnexion ens
 loginEnsp(data:any){
  localStorage.setItem("idEns",data.id)
  this.isConnected=true
  this.router.navigate(["/cours"])
 }
  /*l login enseignant*/
loginEnseignant(enseignant:Enseignant){
  return this.http.post<any>(this.loginEnseignantUrl,enseignant);
}
 //deconnexion etud
 loginEtu(etudiant:Etudiant){
  this.loginEtudiant(etudiant).subscribe((data: any) =>{
    console.log(data)
    var decoded : any = jwt_decode(data.token)
    console.log(decoded)
    this.loginEtup(decoded.data)
    this.etudientConnect.next()
    this.toast.success({
      summary: 'Bienvenue',
    });
  },
  err => {
    console.log(err);
    this.toast.error({
      summary: 'Login echoué vérifiez bien votre mail et mot de passe',
    });
  } 
  )
 }
  //deconnexion etu
  loginEtup(data:any){
    localStorage.setItem("idEtu",data.id)
    this.isConnected=true
    this.router.navigate(["/reservations"])
   }
  /*l login etudiant*/
  loginEtudiant(etudiant:Etudiant){
    return this.http.post<any>(this.loginEtudiantUrl, etudiant);
  }

/*ngoninit eli fi login.ts bech ytesti mconnecti wella*/
isLoggedIn(){

  let token = localStorage.getItem("myToken");

  if (token) {
    return true ; //kenou connecté yraja token(id mta3 enseignant ou etudiant)
  } else {
    return false;
  }
}


   /* lajouter contact */
 addcontact(contact:Contact){
  return this.http.post<any>(this.apiUrl+"/contact", contact,this.httpOptions);
 }
 deletecontact(id:number){
  return this.http.delete<any>(this.apiUrl+"/contact/"+id,this.httpOptions);
  }
  getContacts() {
  return this.http.get<any>(this.apiUrl+"/contact",this.httpOptions);
}
   /* lajouter cour */
   addcour(cour:Cour, id :number){
    return this.http.post<any>(this.apiUrl+"/cours/"+id, cour,this.httpOptions);
   }

  deleteCour(id: number) {
    return this.http.delete<any>(this.apiUrl+"/cours/"+id,this.httpOptions)
  }

/* mta3 signup */
  registEnseignant(enseignant:Enseignant){
    return this.http.post<any>("http://localhost:8081/api/enseignant/registerenseignant", enseignant, this.httpOptions);
  }
  addenseignant(enseignant:Enseignant){
    return this.http.post<any>(this.apiUrl+"/enseignant", enseignant,this.httpOptions);
  }
/* mta3 inscription */
registEtudiant(etudiant:Etudiant){
  return this.http.post<any>("http://localhost:8081/api/etudiant/registeretudiant", etudiant, this.httpOptions);
}

  /* tjib listeett +l nombre mte7om fel dashbord*/
getCour(): Observable<Cour[]>{
  return this.http.get<Cour[]>(this.apiUrl +"/cours");
}

getDomaineEtude(): Observable<DomaineEtude[]>{
  return this.http.get<DomaineEtude[]>(this.apiUrl + "/domaineEtude");
}
getSpecialiteEtude(): Observable<SpecialiteEtude[]>{
  return this.http.get<SpecialiteEtude[]>(this.apiUrl + "/specialiteEtude");
}
getEnseignant(): Observable<Enseignant[]>{
  return this.http.get<Enseignant[]>(this.apiUrl + "/enseignant");
}
getEtudiant(): Observable<Etudiant[]>{
  return this.http.get<Etudiant[]>(this.apiUrl + "/etudiant");
}
/*modifier ens*/
updateEnseignant(enseignant : Enseignant,id: number) : Observable<Enseignant>{//9lebthom khater amalt l update ma9loub :)
  const url =` ${this.apiUrl+"/enseignant"}/${id}`
  return this.http.put<Enseignant>(url,enseignant,this.httpOptions)
}
findEnseignantById(id : number): Observable<Enseignant> {
  const url = `${this.apiUrl + "/enseignant"}/${id}`
  return this.http.get<Enseignant>(url,this.httpOptions)
}
/*modifier etudiant*/
updateEtudiant(id: number,etudiant : Etudiant) : Observable<Etudiant>{
  const url =` ${this.apiUrl+"/etudiant"}/${id}`
  return this.http.put<Etudiant>(url,etudiant,this.httpOptions)
}
findEtudiantById(id : number): Observable<Etudiant> {
  const url = `${this.apiUrl + "/etudiant"}/${id}`
  return this.http.get<Etudiant>(url,this.httpOptions)
}

//mta3deconnection ens
get EnsConnect(){
return this._EnsConnect
}
//mta3deconnection etud
get EtuConnect(){
  return this._EtuConnect
  }
//deconnection
logout(){
  console.log("loginout")

    localStorage.removeItem("idEtu")
    localStorage.removeItem("idEns")
    localStorage.removeItem("etudiant")
    this.isConnected=false
    this._etudientConnect.next()
    this.router.navigate(['/']).then(()=>{
      window.location.reload()
    })
}
//mta3 modifier ens
findDomaineEtudeById(id : number): Observable<DomaineEtude> {
  const url = `${this.apiUrl + "/domaineEtude"}/${id}`
  return this.http.get<DomaineEtude>(url,this.httpOptions)
}

//mta3 session cours
findSessionCoursById(id : number): Observable<SessionCours> {
  const url = `${this.apiUrl + "/sessionCour"}/${id}`
  return this.http.get<SessionCours>(url,this.httpOptions)
}
//mta3 detail cour
findCourById(id : number): Observable<Cour> {
  const url = `${this.apiUrl + "/cours"}/${id}`
  return this.http.get<Cour>(url,this.httpOptions)
}
getSessionCours() : Observable<SessionCours[]> {
  return this.http.get<SessionCours[]>(this.apiUrl + "/sessionCour" , this.httpOptions)
}
deleteSessionCours(id : number){
  const url = `${this.apiUrl+"/sessionCour"}/${id}`
  return this.http.delete(url , this.httpOptions)
}
//mise a jour session de cour
miseAjourSession(session:SessionCours){
  return this.http.put<any>( "http://localhost:8081/api/sessionCour/mise-a-jour" ,session, this.httpOptions);
}

addSession( session:SessionCours , id:number){
  return this.http.post<any>("http://localhost:8081/api/sessionCour/"+id , session, this.httpOptions);
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
getAllreservations(){
  return this.http.get<any>( "http://localhost:8081/api/reservation",this.httpOptions);
}


 getAllReservationbyEtudientId(){
    return this.http.get<any>( "http://localhost:8081/api/reservation/get-all-by-id-etudient/"+localStorage.getItem("idEtu") , this.httpOptions);
  }
  reserverFromApi(reservation :Reservation){
    return this.http.post<any>( "http://localhost:8081/api/reservation" ,reservation ,this.httpOptions);
  }
  validerOuAnnulerFromApi(rq:any){
    return this.http.put<any>( "http://localhost:8081/api/reservation/validate-reservation" ,rq ,this.httpOptions);
  }
  suppimerSession(id:any){
    return this.http.delete<any>( "http://localhost:8081/api/sessionCour/"+id, this.httpOptions);
  }
  validerReservation(id:number){
    return this.http.put<any>("http://localhost:8081/api/reservation/valider/"+id, this.httpOptions);
  }
  annulerReservation(id:number) {
    return this.http.put<any>("http://localhost:8081/api/reservation/annuler/"+id, this.httpOptions);
  }

  emailEnseignantExist(email: string) {
    return this.http.get<any>("http://localhost:8081/api/enseignant/existbyemail/"+email)
  }
  emailEtudiantExist(email: string) {
    return this.http.get<any>("http://localhost:8081/api/etudiant/existbyemail/"+email)
  }
  CinEtudiantExist(cin: number) {
    return this.http.get<any>("http://localhost:8081/api/etudiant/existbycin/"+cin)
  }

}

