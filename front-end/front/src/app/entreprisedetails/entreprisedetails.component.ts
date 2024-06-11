import { Component } from '@angular/core';
import {  OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EntrepriseService } from '../_services/entreprise.service';

@Component({
  selector: 'app-entreprisedetails',
  templateUrl: './entreprisedetails.component.html',
  styleUrl: './entreprisedetails.component.css'
})
export class EntreprisedetailsComponent {
  selectedComponent1: string | null = 'overview';
  selectedComponent2: string | null = 'activite';
  selectedComponent: string | null='' ;
  showComponent(component: string, component2: string): void {
    this.selectedComponent = component;
      this.selectedComponent1 = component;
      this.selectedComponent2 = component2;
  }  
 
 

  private route = inject(ActivatedRoute);
  Entreprise:any;
  // Note_Entreprise: any;
  // totalPages: number = 0;
  // id:number = 1;
  // currentPage: number = 0;

  


  photo: string ='';
  formData = {
   id:Number(this.route.snapshot.paramMap.get('id')),
   imageDecode: '',
 };
  constructor(private EntrepriseService: EntrepriseService, private router: Router) {}
 ngOnInit(): void {
  // this.getNoteEntreprises(this.currentPage)
   const id = Number(this.route.snapshot.paramMap.get('id'));
   if (id) {
     console.log("id",id);
      this.getEntreprise(id);
     console.log(" this.Entreprise", this.Entreprise);
  
   }
 }

 onFileChange(event: any) {
  const reader = new FileReader();
  if (event.target.files && event.target.files.length) {
    const file = event.target.files[0];
    reader.onload = () => {
      this.photo = reader.result as string;
      const base64String = reader.result as string;
      this.formData.imageDecode = base64String.split(',')[1]; 
      this.changeimageLead();
   
         };
    reader.readAsDataURL(file);
  
  }
}
 changeimageLead(): void {
   
  console.log('photo this.formData successfully:', this.formData);

  this.EntrepriseService.changeimageEntreprise(this.formData).subscribe({
    next: response => {
      this. getEntreprise(this.formData.id);
      console.log('changephoto successfully:', response);
    },
    error: err => {
      console.log('change photo successfully:', err);
    }
  });
}
 getEntreprise(id: number): void {
  
   this.EntrepriseService.getEntreprise(id).subscribe({
     next: (response) => {
    this.Entreprise=response;
    console.log('le nom est',this.Entreprise.activities);
     },
     error: (error) => {
       console.error('Error get user:', error);
   
     }
   });
 }


//  getNoteEntreprises(page: number ): void {
 
//   console.log('hello boy')
//  this.EntrepriseService.getNoteEntreprise(page,this.id).subscribe({
//    next: (response) => {
//     console.log('les response est:',response._embedded.notes)
//     this.Note_Entreprise = response.content;
//       this.totalPages = response.totalPages;
    
//    },
//    error: (error) => {
//     console.log('le esponse sont:',this.Note_Entreprise)
//      console.error('Error fetching lead:', error);
//      // Handle error gracefully (display error message to user, offer retry option)
//    }
//  });
// }
}
