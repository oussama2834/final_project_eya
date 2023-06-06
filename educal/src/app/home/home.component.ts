import { Component } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { Enseignant } from '../Model/Enseignant.model';
import Swiper from 'swiper';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  totalCour: number = 0
  totalEnseignant: number = 0
  totalDomaineEtude: number = 0
  totalEtudiant: number = 0
  totalSpecialiteEtude: number = 0
  constructor(private service: CrudService) {
  }


  //mta3 swiper
  ngAfterViewInit(): void {
    // Initialiser Swiper
    const swiper = new Swiper('.testimonial__slider', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }


  ngOnInit(): void { /*ye7seb 9adech w y7ot f dashboard*/
    this.service.getCour().subscribe((cour: any) => {
      this.totalCour = cour.length
    })

    this.service.getEnseignant().subscribe((enseignant: any) => {
      this.totalEnseignant = enseignant.length
    })

    this.service.getEtudiant().subscribe((Etudiant: any) => {
      this.totalEtudiant = Etudiant.length
    })

    this.service.getSpecialiteEtude().subscribe((SpecialiteEtude: any) => {
      this.totalSpecialiteEtude = SpecialiteEtude.length
    })

    this.service.getDomaineEtude().subscribe((DomaineEtude: any) => {
      this.totalDomaineEtude = DomaineEtude.length
    })


  }
}
