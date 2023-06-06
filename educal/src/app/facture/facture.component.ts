import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendrierService } from '../service/calendrier.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  date: Date = new Date();
  message = ""
  data: any;
  constructor(public service: CalendrierService, private route: ActivatedRoute, private router: Router) { }

  id: any

  async ngOnInit(): Promise<void> {
    // this.date = new Date()

    this.id = this.route.snapshot.params['id']
    await this.service.getById(this.id).subscribe({
      next: (res: any) => {
        this.data = res;
        console.log(this.data)
      },
      error: (err: any) => {
        console.log(err)
      }
    })

  }



}
