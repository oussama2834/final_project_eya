import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Cour } from '../Model/Cour.model';

@Component({
  selector: 'app-addcours',
  templateUrl: './addcours.component.html',
  styleUrls: ['./addcours.component.css']
})
export class AddcoursComponent {
  imagePath: any;
  userFile: any;
  imgURL : any;
  newCour = new Cour();
  cour: any;
  id !: number;
  public message: string="";
  constructor(private service :CrudService,private router:Router,private fb:FormBuilder,private toast:NgToastService) {}

  addNewCour() {
    this.id = Number(localStorage.getItem('idEns'))
    this.newCour.img = this.imgURL
    console.log(this.newCour);
      this.service.addcour(this.newCour,this.id).subscribe(cour => {
        console.log(cour)
        this.toast.success({
          detail: 'Succes Message',
          summary: 'cour ajoutée avec succès',
        });
          this.router.navigate(['/cours'])
      })
    }
//ta9ra l logo
onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;


      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = 'Only images are supported.';
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }

    }}

  //ya9ra lpdf
recuperPhoto(fileInput: any) {
  this.cour = fileInput.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsDataURL(this.cour);
  fileReader.onload = (e: any) => {
    console.log('fileReader.result');
    this.cour = fileReader.result;
    this.newCour.Cour=this.cour;
    console.log(this.newCour.Cour)
  };

}
  ngOnInit(): void {

  }
    //case desription
calculateTextareaRows(): number {
  const textarea = document.getElementById('exampleFormControlTextarea5') as HTMLTextAreaElement;
  const lineCount = textarea.value.split('\n').length;
  return Math.max(3, lineCount); // Set a minimum of 3 rows
}
}
