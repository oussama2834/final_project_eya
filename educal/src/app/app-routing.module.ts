import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursComponent } from './cours/cours.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AddcoursComponent } from './addcours/addcours.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnecxionComponent } from './connecxion/connecxion.component';
import { ConnectComponent } from './connect/connect.component';
import { DetailCourComponent } from './detail-cour/detail-cour.component';
import { FactureComponent } from './facture/facture.component';
import { AjouterSeanceComponent } from './ajouter-seance/ajouter-seance.component';
import { ReserverFromCalendrierComponent } from './reserver-from-calendrier/reserver-from-calendrier.component';
import { ValidateReservationComponent } from './validate-reservation/validate-reservation.component';
import { MyReservationComponent } from './my-reservation/my-reservation.component';
import { ListeSessionCourComponent } from './liste-session-cour/liste-session-cour.component';
import { DetailcourComponent } from './detailcour/detailcour.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { ReservationsenseignantComponent } from './reservationsenseignant/reservationsenseignant.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  { path: '', component: HomeComponent },


  {path:'contact',component:ContactComponent},
  {path:'about',component:AboutComponent},

  {path:'cours',component:CoursComponent},
  {path:'detailCour/:id',component:DetailCourComponent},
  {path:'addcours',component:AddcoursComponent},

  {path:'connect',component:ConnectComponent},

  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'reservations',component:ReservationsenseignantComponent},

  {path:'inscription',component:InscriptionComponent},
  {path:'connexion',component:ConnecxionComponent},


  {path:'facture/:id',component:FactureComponent},

  {path:'ajouter-seance',component:AjouterSeanceComponent},
  {path:'reserver-seance',component:ReserverFromCalendrierComponent},
  {path:'mes-reservations',component:MyReservationComponent},
  {path:'validate-reservations',component:ValidateReservationComponent},


  {path:'listesessioncours',component:ListeSessionCourComponent},
  {path:'detailsessioncours/:id' , component : DetailcourComponent},

  {path:'calendrier' , component : CalendrierComponent},
  {path:'messages' , component : MessagesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
