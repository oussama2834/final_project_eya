import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SessionCours } from '../Model/SessionCour.model';
import { CrudService } from '../service/crud.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-liste-session-cour',
  templateUrl: './liste-session-cour.component.html',
  styleUrls: ['./liste-session-cour.component.css']
})
export class ListeSessionCourComponent implements OnInit {

  searchText: any;
  affiche: any;
  // @ViewChild('pdfdiv') pdfTable: ElementRef;
  displayBasic: boolean = false;
  listSessionCours: SessionCours[] = []
  numberOfSessionCours: number = 0

  constructor(private service: CrudService, private router: Router, private toast: NgToastService) { }

  onDeleteSessionCours(sessionCours: SessionCours) {
    if (confirm("Voulez vous supprimer cette session de cours ?")) {

      this.service.deleteSessionCours(sessionCours.id as number).subscribe(() => {
        this.router.navigate(['/listesessioncours'])
        window.location.reload()
        this.toast.success({
          detail: 'Succes Message',
          summary: 'Session de cours supprimée avec succès',
        });


      })
    }
  }

  ngOnInit(): void {
    this.service.getSessionCours().subscribe((sessioncours: any) => {
      this.listSessionCours = sessioncours
      this.numberOfSessionCours = sessioncours.length
    })
  }
  showBasicDialog(pdf: string | ArrayBuffer | null) {
    this.affiche = pdf;
    this.displayBasic = true;
  }
  download(pdfData: any) {
    const linkSource = pdfData;
    const downloadLink = document.createElement("a");
    const fileName = "Affiche_cours.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
}
