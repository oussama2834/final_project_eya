import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { Injectable } from '@angular/core';
import { Cour } from '../Model/Cour.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent {
 Cour: Cour[] = [];
 CoursparEnseignant : Cour []=[];
 constructor(private service: CrudService, private router: Router,private toast:NgToastService) {}
 //tjib url l photo
 isEtu: boolean = false //mta deconnexion
 isEns: boolean = false //mta deconnexion
 idEtudiant !: number;
 idEnseignant !: number;
 getLogoURL(logo: string): string {
  return `data:image/png;base64, ${logo}`;
}
  // Mta3 next page
  p: number = 1;
  collection: any[] = [];

  test() {
    if (this.idEnseignant) {
      this.isEns = true
    }
    else {
      this.isEns = false
    }
    if (this.idEtudiant) {
      this.isEtu = true

    }
    else {
      this.isEtu = false

    }
  }
  ngOnInit(): void {
    this.idEnseignant = Number(localStorage.getItem("idEns"));
    this.idEtudiant = Number(localStorage.getItem("idEtu"));
    console.log(this.idEtudiant)
    console.log(this.idEnseignant)
    console.log(this.test());
    console.log(this.isEtu)
    console.log(this.isEns)
    this.service.getCour().subscribe((cour: any) => {
      this.Cour = cour;
     this.CoursparEnseignant = this.Cour.filter(c => c.enseignant.id == this.idEnseignant)
      console.log(this.Cour);
    });
  }
  delete(id :number) {
    this.service.deleteCour(id).subscribe(res => {
    console.log(res)
    })
    this.CoursparEnseignant = this.CoursparEnseignant.filter(c => c.id != id);
  }

  // Function to check if the logo property is a valid image URL
  isImageURL(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

//mta3 cour pdf
  downloadPdf(base64String: string) {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'application/pdf' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = 'cv.pdf';

    link.dispatchEvent(new MouseEvent('click'));
    URL.revokeObjectURL(url);
  }


}
