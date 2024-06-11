import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ContactService } from '../_services/contact.service';

import {  TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//const API_URL = 'http://54.87.130.187:9090/api/Contacts/';
const API_URL = 'http://localhost:9090/api/contacts/';

interface ApiResponse {
    content: any[];  
    totalPages: number;
}

@Component({
    selector: 'app-produits',
    templateUrl: './produits.component.html',
    styleUrls: ['./produits.component.css'],
    
})
export class ProduitsComponent implements OnInit {

  modalRef?: BsModalRef;
  Contacts: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 12;
 
  //formData: FormData = new FormData();
  photo: string ='';
 // Method to fetch Contacts
 search: string = '';
statusContact: string = '';
typecontact: string = '';
selectedFileName: string = '';
  formDatafile: FormData = new FormData();


  onFileContactChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.formDatafile.set('file', file); // Set file in formData  
       console.log('Contact Import successfully:', this.formDatafile);
    }
  }
submitImportContactForm(): void {
  this.closeModal();
  

  this.ContactService.uploadContact(this.formDatafile).subscribe({
    next: response => {
      console.log('Contact Import successfully:', response);

      this.getAllContacts(this.currentPage);
      // Handle success as needed
    },
    error: err => {
      console.log('Contact added successfully:', err);
    }
  });
}
getAllContacts(page: number ): void {
 
   this.closeModal();
  this.ContactService.getAllContacts(page,this.search,this.statusContact,this.typecontact).subscribe({
    next: (response) => {
      this.Contacts = response.content;
      this.totalPages = response.totalPages;
     
    },
    error: (error) => {
      console.error('Error fetching Contact:', error);
      // Handle error gracefully (display error message to user, offer retry option)
    }
  });
}/*
getAllContacts(page: number) {
  console.log('this.search', this.search);

  
  // Construct API URL with search criteria
  const apiUrl = `${API_URL}pages?page=${page}&size=${this.pageSize}&search=${this.search}&statusContact=${this.statusContact}&typecontact=${this.typecontact}`;
  console.log('apiUrl', apiUrl);
  
  // Fetch Contacts using HttpClient
  this.httpClient.get<ApiResponse>(apiUrl).subscribe(
    (response) => {
      // Assign fetched Contacts and total pages
      this.Contacts = response.content;
      this.totalPages = response.totalPages;
    //  console.log(this.Contacts);
    },
    (error) => {
      console.error('Error fetching Contacts:', error);
    }
  );
}*/

onSearch(event: any) {
  const inputValue = event.target.value; // Get the value of the input field
  this.search=inputValue;
  this.getAllContacts(this.currentPage); // Fetch Contacts when search criteria change
}

onStatusContact(selectedStatus: string) {
  this.statusContact = selectedStatus; // Update statusContact criteria with selected status
  console.log('this.Contact',this.statusContact);
  this.getAllContacts(this.currentPage); // Fetch Contacts when statusContact criteria change
}
onSelectTypecontact(selectedStatus: string) {
  this.typecontact = selectedStatus; // Update statusContact criteria with selected status
  console.log('this.typecontact',this.typecontact);
  this.getAllContacts(this.currentPage); // Fetch Contacts when statusContact criteria change
}

   
  openModal(template: TemplateRef<any>): BsModalRef {
    return this.modalService.show(
      template,
      { class: 'modal-lg modal-dialog-centered',
        ignoreBackdropClick: true, 
        keyboard: false
      });
}
openModalimport(template: TemplateRef<any>): BsModalRef {
  return this.modalService.show(
    template,
    { class: ' modal-dialog-centered',
      ignoreBackdropClick: true, 
      keyboard: false
    });
}
openDelModal(template: TemplateRef<any>): BsModalRef {
  return this.modalService.show(
    template,
    { class: ' modal-dialog-centered',
      ignoreBackdropClick: true, 
      keyboard: false
    });
}
  closeModal() {
    this.modalService.hide();
  }


  constructor(
   
    private modalService: BsModalService,private httpClient: HttpClient,private ContactService: ContactService, private router: Router) {}
  
  formData = {
    nom: '',
    statuscontact: 'New',
    phaseCycleVie: 'Contact', 
    intitulePoste: '',
    typecontact: 'Client',
    nomentreprise:'',
    proprietaire:'',
    date:'',
    linkedin: '',
    tel: '',
    email: '',
    prenom: '',
    imageDecode: '',
  };
  

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.onload = () => {
        this.photo = reader.result as string;
        const base64String = reader.result as string;
        this.formData.imageDecode = base64String.split(',')[1]; 
           };
      reader.readAsDataURL(file);
    }
  }

  deleteContact(id: number): void {
    console.log('Deleting Contact:', id);
     this.closeModal();
    this.ContactService.deleteContact(id).subscribe({
      next: (response) => {
        console.log('Contact deleted successfully:', response);
        this.getAllContacts(this.currentPage); // Refresh Contact list or display success message
      },
      error: (error) => {
        console.error('Error deleting Contact:', error);
        // Handle error gracefully (display error message to user, offer retry option)
      }
    });
  }
  
  ngOnInit(): void {
    
    this.getAllContacts(this.currentPage);
  }

  submitContactForm(): void {
    this.closeModal();
    console.log('Contact added successfully:', this.formData.imageDecode);

    this.ContactService.addContact(this.formData).subscribe({
      next: response => {
        console.log('Contact added successfully:', response);

        this.getAllContacts(this.currentPage);
        // Handle success as needed
      },
      error: err => {
        console.log('Contact added successfully:', err);
      }
    });
  }


  
 

 


  onPageChange(page: number) {
    this.currentPage=page;
      this.getAllContacts(page);
  }
  
  pagesArray(): number[] {
    return Array.from({ length: this.totalPages || 1 }, (_, i) => i + 1);
  }

  onPreviousNextPage(page: number) {
    this.currentPage=page;
      this.getAllContacts(page);
  }

  resetFilters() {
    this.search= '';
    this.statusContact = '';
    this.typecontact = '';
    this.getAllContacts(0);
  }


  navigateToContactDetails(ContactId: number): void {
    this.ContactService.setContactId(ContactId);
    this.router.navigate(['Contact/details:ContactId']);
  }
}