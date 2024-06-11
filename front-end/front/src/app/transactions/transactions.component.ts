import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ContactService } from '../_services/contact.service';

import {  TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from '../_shared/board.model';
import { Column } from '../_shared/column.model';

//const API_URL = 'http://54.87.130.187:9090/api/contacts/';
const API_URL = 'http://localhost:9090/api/contacts/';  

interface ApiResponse {
    content: any[];  
    totalPages: number;
}

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.css'],
    
})
export class TransactionsComponent implements OnInit {
  board: Board = new Board('Test Board', [
    new Column('Prospect à rediger', [
      "Some random idea",
      "This is another random idea",
      "build an awesome application"
    ]),
    new Column('Prospect  rediger', [
      "Lorem ipsum",
      "foo",  "foo",
      "This was in the 'Research' column"
    ]),
    new Column('Prospect  a relancer', [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ]),
    new Column('Accepte', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ]),
    new Column('Refuser', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ]),
    new Column('Terminer', [
      'Get up',
      'Brush teeth',
      'Take a shower',
      'Check e-mail',
      'Walk dog'
    ])
  ]);


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


  modalRef?: BsModalRef;
  contacts: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 12;
 
  //formData: FormData = new FormData();
  photo: string ='';
 // Method to fetch contacts
 search: string = '';
statuscontact: string = '';
typecontact: string = '';
selectedFileName: string = '';
  formDatafile: FormData = new FormData();


  onFilecontactChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.formDatafile.set('file', file); // Set file in formData  
       console.log('contact Import successfully:', this.formDatafile);
    }
  }
submitImportcontactForm(): void {
  this.closeModal();
  

  this.contactService.uploadContact(this.formDatafile).subscribe({
    next: response => {
      console.log('contact Import successfully:', response);

      this.getAllcontacts(this.currentPage);
      // Handle success as needed
    },
    error: err => {
      console.log('contact added successfully:', err);
    }
  });
}
getAllcontacts(page: number ): void {
 
   this.closeModal();
  this.contactService.getAllContacts(page,this.search,this.statuscontact,this.typecontact).subscribe({
    next: (response) => {
      this.contacts = response.content;
      this.totalPages = response.totalPages;
     
    },
    error: (error) => {
      console.error('Error fetching contact:', error);
      // Handle error gracefully (display error message to user, offer retry option)
    }
  });
}/*
getAllcontacts(page: number) {
  console.log('this.search', this.search);

  
  // Construct API URL with search criteria
  const apiUrl = `${API_URL}pages?page=${page}&size=${this.pageSize}&search=${this.search}&statuscontact=${this.statuscontact}&typecontact=${this.typecontact}`;
  console.log('apiUrl', apiUrl);
  
  // Fetch contacts using HttpClient
  this.httpClient.get<ApiResponse>(apiUrl).subscribe(
    (response) => {
      // Assign fetched contacts and total pages
      this.contacts = response.content;
      this.totalPages = response.totalPages;
    //  console.log(this.contacts);
    },
    (error) => {
      console.error('Error fetching contacts:', error);
    }
  );
}*/

onSearch(event: any) {
  const inputValue = event.target.value; // Get the value of the input field
  this.search=inputValue;
  this.getAllcontacts(this.currentPage); // Fetch contacts when search criteria change
}

onStatuscontact(selectedStatus: string) {
  this.statuscontact = selectedStatus; // Update statuscontact criteria with selected status
  console.log('this.contact',this.statuscontact);
  this.getAllcontacts(this.currentPage); // Fetch contacts when statuscontact criteria change
}
onSelectTypecontact(selectedStatus: string) {
  this.typecontact = selectedStatus; // Update statuscontact criteria with selected status
  console.log('this.typecontact',this.typecontact);
  this.getAllcontacts(this.currentPage); // Fetch contacts when statuscontact criteria change
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
    nom: '',
    statuscontact: 'New',
    phaseCycleVie: 'contact', 
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

  deletecontact(id: number): void {
    console.log('Deleting contact:', id);
     this.closeModal();
    this.contactService.deleteContact(id).subscribe({
      next: (response) => {
        console.log('contact deleted successfully:', response);
        this.getAllcontacts(this.currentPage); // Refresh contact list or display success message
      },
      error: (error) => {
        console.error('Error deleting contact:', error);
        // Handle error gracefully (display error message to user, offer retry option)
      }
    });
  }
  
  ngOnInit(): void {
    
    this.getAllcontacts(this.currentPage);
  }

  submitcontactForm(): void {
    this.closeModal();
    console.log('contact added successfully:', this.formData.imageDecode);

    this.contactService.addContact(this.formData).subscribe({
      next: response => {
        console.log('contact added successfully:', response);

        this.getAllcontacts(this.currentPage);
        // Handle success as needed
      },
      error: err => {
        console.log('contact added successfully:', err);
      }
    });
  }



  /*getAllcontacts(page: number) {
    const apiUrl = `${API_URL}pages?page=${page}&size=${this.pageSize}`;
  
    this.httpClient.get<ApiResponse>(apiUrl).subscribe(
      (response) => {
        this.contacts = response.content;
        this.totalPages = response.totalPages;
        console.log(this.contacts);
      },
      (error) => {
        console.error('Error fetching contactrs:', error);
      }
    );
  }*/
  
 

 


  onPageChange(page: number) {
    this.currentPage=page;
      this.getAllcontacts(page);
  }
  
  pagesArray(): number[] {
    return Array.from({ length: this.totalPages || 1 }, (_, i) => i + 1);
  }

  onPreviousNextPage(page: number) {
    this.currentPage=page;
      this.getAllcontacts(page);
  }

  resetFilters() {
    this.search= '';
    this.statuscontact = '';
    this.typecontact = '';
    this.getAllcontacts(0);
  }


  navigateTocontactDetails(contactId: number): void {
    this.contactService.setContactId(contactId);
    this.router.navigate(['contact/details:contactId']);
  }
}