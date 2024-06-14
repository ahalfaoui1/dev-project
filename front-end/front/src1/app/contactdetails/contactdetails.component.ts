import { Component } from '@angular/core';
import {  OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ContactService } from '../_services/contact.service';
@Component({
  selector: 'app-contactdetails',
  templateUrl: './contactdetails.component.html',
  styleUrl: './contactdetails.component.css'
})
export class ContactdetailsComponent {
  private route = inject(ActivatedRoute);
   contact:any;
 
   photo: string ='';
   formData = {
    id:Number(this.route.snapshot.paramMap.get('id')),
    imageDecode: '',
  };
   constructor(private ContactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getContact(id);
    }
  }
  getContact(id: number): void {
    console.log(' Contact :', id);
    this.ContactService.getContact(id).subscribe({
      next: (response) => {
        this.contact = response;
        console.log('Contact  successfully:', response);
        console.log('Contact2  successfully2:', this.contact);

      },
      error: (error) => {
        console.error('error getContact:', error);
    
      }
    });
  }
  onFileChange(event: any) {
    console.log('hello')
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
}
