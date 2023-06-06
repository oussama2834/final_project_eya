import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cour } from '../Model/Cour.model';
@Component({
  selector: 'app-detail-cour',
  templateUrl: './detail-cour.component.html',
  styleUrls: ['./detail-cour.component.css']
})
export class DetailCourComponent implements OnInit {
  id: number = 0;
  cour: Cour = new Cour();

  constructor(
    private service: CrudService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.service.findCourById(this.id).subscribe((cour: any) => {
      this.cour = cour;
      console.log(this.cour)
    });
  }
  onListCour(): void {
    this.router.navigate(['/cours']);
  }
//mtaa description sur plusiers lignes
calculateTextareaRows(): number {
  const textarea = document.getElementById('exampleFormControlTextarea5') as HTMLTextAreaElement;
  const lineCount = textarea.value.split('\n').length;
  return Math.max(3, lineCount); // Set a minimum of 3 rows
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
  //tjib url l photo
  getLogoURL(logo: string): string {
    return `data:image/png;base64, ${logo}`;
  }
  // Function to check if the logo property is a valid image URL
  isImageURL(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }



}
