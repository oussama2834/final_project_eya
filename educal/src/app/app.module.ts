import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgToastModule } from 'ng-angular-popup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoursComponent } from './cours/cours.component';
import { AboutComponent } from './about/about.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AddcoursComponent } from './addcours/addcours.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnecxionComponent } from './connecxion/connecxion.component';
import { ConnectComponent } from './connect/connect.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DetailCourComponent } from './detail-cour/detail-cour.component';
import { FactureComponent } from './facture/facture.component';
import { AjouterSeanceComponent } from './ajouter-seance/ajouter-seance.component';
import { ReserverFromCalendrierComponent } from './reserver-from-calendrier/reserver-from-calendrier.component';
import { MyReservationComponent } from './my-reservation/my-reservation.component';
import { ValidateReservationComponent } from './validate-reservation/validate-reservation.component';
import { ListeSessionCourComponent } from './liste-session-cour/liste-session-cour.component';
import { DetailcourComponent } from './detailcour/detailcour.component';
import { Header1Component } from './header1/header1.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ReservationsenseignantComponent } from './reservationsenseignant/reservationsenseignant.component';
import { MessagesComponent } from './messages/messages.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { ListEnseignantComponent } from './list-enseignant/list-enseignant.component';
import { ListEtudiantComponent } from './list-etudiant/list-etudiant.component';
import { AjouteretudiantComponent } from './ajouteretudiant/ajouteretudiant.component';
import { ListContactComponent } from './list-contact/list-contact.component';
import { AjouterenseignantComponent } from './ajouterenseignant/ajouterenseignant.component';
import { MenuComponent } from './menu/menu.component';
import { SeanceformationComponent } from './seanceformation/seanceformation.component';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    CoursComponent,
    AboutComponent,
    SignupComponent,
    SigninComponent,
    AddcoursComponent,
    InscriptionComponent,
    ConnecxionComponent,
    ConnectComponent,
    DetailCourComponent,
    FactureComponent,
    AjouterSeanceComponent,
    ReserverFromCalendrierComponent,
    MyReservationComponent,
    ValidateReservationComponent,
    ListeSessionCourComponent,
    DetailcourComponent,
    Header1Component,
    CalendrierComponent,
    ReservationsenseignantComponent,
    MessagesComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
    ListEnseignantComponent,
    ListEtudiantComponent,
    ListContactComponent,
    AjouteretudiantComponent,
    AjouterenseignantComponent,
    MenuComponent,
    SeanceformationComponent
  ],
  imports: [
    BrowserModule,//run Angular applications in a web browser.
    FlatpickrModule.forRoot(),
    TooltipModule.forRoot(),
    AppRoutingModule, // enables navigation between different components
    FormsModule, //provides directives and services for handling form controls
    ReactiveFormsModule,//support for reactive forms in Angular.
    HttpClientModule, //necessary services and features for making HTTP requests and handling responses
    NgToastModule,//provides toast notifications functionality.
    NgxPaginationModule, //mta3 pagination
    Ng2SearchPipeModule, //mta3 filtre
    // PdfViewerModule, //mta3 pdf
    CommonModule,//zedtou lel view mta calender
    BrowserAnimationsModule, CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,

    }),
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
