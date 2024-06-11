import { Component, TemplateRef } from '@angular/core';
import {  OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ContactService } from '../_services/contact.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-contactdetails',
  templateUrl: './contactdetails.component.html',
  styleUrl: './contactdetails.component.css'
})
export class ContactdetailsComponent {
  private route = inject(ActivatedRoute);
   contact:any;
 
   photo: string ='';


   getContact(id: number): void {
    console.log('Contact :', id);
    this.ContactService.getContact(id).subscribe({
      next: (response) => {
        this.contact = response;
       // console.log('Contact  successfully:', response);
      },
      error: (error) => {
        console.error('error getContact:', error);
    
      }
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getContact(id);
    }
  }
   formData = {
    id:Number(this.route.snapshot.paramMap.get('id')),
    imageDecode: '',
    status: '',
    jobTitle: '',
    type: '',
    companyName:'',
    tel: '',
    email: '',
    adress: '',
    source: '',
  };
   constructor(private modalService: BsModalService,private ContactService: ContactService, private router: Router) {}
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


  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.onload = () => {
        this.photo = reader.result as string;
        const base64String = reader.result as string;
        this.formData.imageDecode = base64String.split(',')[1]; 
        this.changeimageContact();
     
           };
      reader.readAsDataURL(file);
    
    }
  }
  changeimageContact(): void {
   
    console.log('photo this.formData successfully:', this.formData);

    this.ContactService.changeimageUser(this.formData).subscribe({
      next: response => {
        this. getContact(this.formData.id);
        console.log('changephoto successfully:', response);
      },
      error: err => {
        console.log('change photo successfully:', err);
      }
    });
  }
  activeComponent: string = 'active';
  selectedComponent: string | null = 'notes';
  showComponent(component: string): void {
    this.selectedComponent = component;
  }  
  UpdateContact(c: FormData): void {
    this.closeModal();
    console.log('Updating Contact:', );
    this.ContactService.updateContact(this.formData).subscribe({
      next: (response) => {
        console.log('Contact updated successfully:', response);
        this.getContact(this.formData.id); // Refresh Contact list or display success message
      },
      error: (error) => {
        console.error('Error updating Contact:', error);
        // Handle error gracefully (display error message to user, offer retry option)
      }
    });
  }
}
