import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ContactService } from '../_services/contact.service';

import {  TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


interface ApiResponse {
    content: any[];  
    totalPages: number;
}

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    
})
export class ContactComponent implements OnInit {

  modalRef?: BsModalRef;
  Contacts: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 12;
 
  //formData: FormData = new FormData();
  photo: string ='';
 // Method to fetch Contacts
 search: string = '';
statuscontact: string = '';
typecontact: string = '';
selectedFileName: string = '';
  formDatafile: FormData = new FormData();


  onFileContactChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.formDatafile.append('file', file);
      this.selectedFileName = file.name;
    }
  }
  submitImportContactForm(): void {
    this.closeModal();
    
    this.contactService.uploadContact(this.formDatafile).subscribe({
      next: response => {
        console.log('Importation des contacts réussie :', response);
        // Assuming getAllContacts and currentPage are declared and defined properly
        this.getAllContacts(this.currentPage);
      },
      error: err => {
        console.log('Erreur lors de l\'ajout des contacts :', err);
      }
    });
  }



getAllContacts(page: number ): void {
 
   this.closeModal();
  this.contactService.getAllContacts(page,this.search,this.statuscontact,this.typecontact).subscribe({
    next: (response) => {
      this.Contacts = response.content;
      this.totalPages = response.totalPages;
      console.log(' fetching Contact:', this.Contacts);
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
  this.statuscontact = selectedStatus; // Update statusContact criteria with selected status
  console.log('this.Contact',this.statuscontact);
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
   
    private modalService: BsModalService,private httpClient: HttpClient,private contactService: ContactService, private router: Router) {}
  


  


  formData = {
  //   firstName: "aaaa",
  // lastName: "aaaaa",
  // email: "aaaa",
  // password: "aaaa",
  // role: "aaaa",
  // imageCode: "aaaa",
  // currentpassword: "aaaa",
  // roles: "aaaa",
  // dateCreated: null,
  // dateUpdated: null,
  // tel: "string",
  // nabled: true,
  // resetPasswordToken: "aaaa",


    firstName: '',
    status: 'New',
    jobTitle: '',
    type: 'Client',
    companyName:'',
    proprietaire:'',
    date:'',
    linkedin: '',
    tel: '',
    email: '',
    lastName: '',
    imageCode: '',
    phasecyclevie: 'Contact',

    source:'',
    adress:'',
    search:''

  };
  

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.onload = () => {
        this.photo = reader.result as string;
        const base64String = reader.result as string;
        this.formData.imageCode = base64String.split(',')[1]; 
           };
      reader.readAsDataURL(file);
    }
  }

  deleteContact(id: number): void {
    console.log('Deleting Contact:', id);
     this.closeModal();
    this.contactService.deleteContact(id).subscribe({
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
    console.log('Contact added successfully:', this.formData);

    this.contactService.addContact(this.formData).subscribe({
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
    this.statuscontact = '';
    this.typecontact = '';
    this.getAllContacts(0);
  }


  navigateToContactDetails(ContactId: number): void {
    this.contactService.setContactId(ContactId);
    this.router.navigate(['contact/details:ContactId']);
  }
}