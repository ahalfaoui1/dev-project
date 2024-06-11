import { Component, TemplateRef } from '@angular/core';
import {  OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EntrepriseService } from '../_services/entreprise.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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

  photo: string ='';
  formData = {
   id:Number(this.route.snapshot.paramMap.get('id')),
  type: '',
  tel: '',
  email: '',
  imageCode: '',
  adress:'',
  zipCode:'',
  emplyeeNb:'',
  timeZone:'',
  description:'',
  city:'',
  country:''
};
  constructor(private modalService: BsModalService, private EntrepriseService: EntrepriseService, private router: Router) {}
  closeModal() {
    this.modalService.hide();
  }
  openModal(template: TemplateRef<any>): BsModalRef {
    return this.modalService.show(
      template,
      { class: 'modal-lg modal-dialog-centered',
        ignoreBackdropClick: true, 
        keyboard: false
      });
}

 ngOnInit(): void {
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
      this.formData.imageCode = base64String.split(',')[1]; 
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
     },
     error: (error) => {
       console.error('Error get user:', error);
   
     }
   });
 }
 UpdateEntreprise(c: FormData): void {
  this.closeModal();
  console.log('Updating Entrprise:', );
  this.EntrepriseService.updateEntreprise(this.formData).subscribe({
    next: (response) => {
      console.log('Entrprise updated successfully:', response);
      this.getEntreprise(this.formData.id); // Refresh Contact list or display success message
    },
    error: (error) => {
      console.error('Error updating Entrprise:', error);
      // Handle error gracefully (display error message to user, offer retry option)
    }
  });
}

}
