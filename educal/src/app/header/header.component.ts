import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isEtu:boolean=false //mta deconnexion
  isEns:boolean=false //mta deconnexion
  totalCour: number = 0
  idEtudiant !: number;
  idEnseignant !: number;
  idAdmin !: number;
  constructor(public service:CrudService,public router:Router){  //public khater mechy y9ra id login ens w etud men ts
  }

    //mta3 deconnexion enseignant
    updateprofil(){
      this.router.navigate(['/profil'])}

    connected(){if(localStorage.getItem("mytokenEns"))
  [this.isEns=true]}

 //mta3 deconnexion enseignant
 updateprofilEt(){
  this.router.navigate(['/profil-et'])}

connectedEt(){if(localStorage.getItem("mytokenEtu"))
[this.isEns=true]}



  gerecaledrier(){
    this.router.navigate(['/profil'])
  }
  ngOnInit(): void{

    this.idEnseignant = Number(localStorage.getItem("idEns"));
    this.idEtudiant = Number(localStorage.getItem("idEtu"));
    console.log(this.idEtudiant)
    console.log(this.idEnseignant)
    console.log(this.test());
    console.log(this.isEtu)
    console.log(this.isEns)


    //mta3 deconnexion enseig
    this.service.EnsConnect.subscribe(()=>{
      this.testlogin()
    })
    //mta3 deconnexion etud
    this.service.EtuConnect.subscribe(()=>{
      this.testlogin()
    })
    this.testlogin()


     /*ye7seb 9adech w y7ot f dashboard*/
    this.service.getCour().subscribe(cour =>{
      this.totalCour=cour.length})
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




  testlogin(){
    //test ens
if(Number(localStorage.getItem("idEns"))){
this.isEns=true
}
else{
this.isEns=false
}
//test etud
if(Number(localStorage.getItem("idEtud"))){
this.isEtu=true
}
else{
  this.isEtu=false
}
    }
    //mta deconnecion
    deconnexion(){
      this.service.logout()
      this.router.navigate(['/connect'])
    }

    }










