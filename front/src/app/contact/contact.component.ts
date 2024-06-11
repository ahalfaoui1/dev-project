import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../_services/contact.service';

import {  TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import PhoneInput from 'react-phone-number-input'
import { UserService } from '../_services/user.service';


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
  private route = inject(ActivatedRoute);
  modalRef?: BsModalRef;
  Contacts: any[] = [];
  totalPages: number = 0;
  
  pageSize: number = 12;
  user : any;
  //formData: FormData = new FormData();
  photo: string ='';
  currentPage: number = 0;
 search: string = '';
status: string = '';
type: string = '';
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
        this.getAllContacts(this.currentPage, this.search, this.status, this.type);
      },
      error: err => {
        console.log('Erreur lors de l\'ajout des contacts :', err);
      }
    });
  }



getAllContacts(page: number, search:string, status:string, type:string ): void {
 
   this.closeModal();
  this.contactService.getAllContacts(page,search,status,type).subscribe({
    next: (response) => {
      this.Contacts = response.content;
      this.totalPages = response.totalPages;
      console.log(' fetching Contact:', this.Contacts);
      console.log('search',search);
      console.log('status',status);
      console.log('type',type);
    },
    error: (error) => {
     console.error('Error fetching Contact:', error);
      // Handle error gracefully (display error message to user, offer retry option)
    }
  });
}

onSearch(event: any) {
  this.search=event.target.value.toUpperCase()
  const inputValue = event.target.value.toUpperCase(); // Get the value of the input field
 // searchText=inputValue;
  console.log('this.Contact', inputValue);
  this.getAllContacts(this.currentPage, inputValue, this.status, this.type); // Fetch Contacts when search criteria change
}



onStatus(selectedStatus: string) {
  //this.status = selectedStatus; // Update statusContact criteria with selected status
  console.log('this.Contact',selectedStatus);
  this.getAllContacts(this.currentPage, this.search, selectedStatus, this.type); // Fetch Contacts when statusContact criteria change
}
onSelectTypecontact(selectedType: string) {
 // this.type = selectedStatus; // Update statusContact criteria with selected status
  console.log('this.typecontact', selectedType);
  this.getAllContacts(this.currentPage, this.search, this.status, selectedType); // Fetch Contacts when statusContact criteria change
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
   
    private modalService: BsModalService,private httpClient: HttpClient,private contactService: ContactService, private userServise : UserService, private router: Router) {}
  
  formData = {
    lastName: '',
    status: 'New',
    jobTitle: '',
    type: 'Contact',
    companyName:'',
 //   dateCreated:'',
    linkedin: '',
    tel: '',
    email: '',
    firstName: '',
    imageCode: '',
    adress: '',
    source: 'Web',
  };
  
  getCurrentUser(id : number){
    console.log('user :', id);
      this.userServise.getUser(id).subscribe({
        next: (response) => {
          this.user = response;
          console.log('user  successfully:', response);
        },
        error: (error) => {
          console.error('error getUser:', error);
      
        }
      });
  }   
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
        this.getAllContacts(this.currentPage, this.search, this.status, this.type); // Refresh Contact list or display success message
      },
      error: (error) => {
        console.error('Error deleting Contact:', error);
        // Handle error gracefully (display error message to user, offer retry option)
      }
    });
  }
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getCurrentUser(id);
    }
    this.getAllContacts(this.currentPage, this.search, this.status, this.type);
    this.getCurrentUser(id);
  }

  submitContactForm(): void {
    this.closeModal();
    console.log('To save:', this.formData.imageCode);
    //

    this.contactService.addContact(this.formData).subscribe({
      next: response => {
        console.log('Contact added successfully:', response);

        this.getAllContacts(this.currentPage, this.search, this.status, this.type);
        // Handle success as needed
      },
      error: err => {
        console.log('error saving:', err);
      }
    });
  }


  onPageChange(page: number) {
    this.currentPage=page;
      this.getAllContacts(page, this.search, this.status, this.type);
  }
  
  pagesArray(): number[] {
    return Array.from({ length: this.totalPages || 1 }, (_, i) => i + 1);
  }

  onPreviousNextPage(page: number) {
    this.currentPage=page;
      this.getAllContacts(page, this.search, this.status, this.type);
  }

  resetFilters() {
    this.getAllContacts(0,'','','');
  }


  navigateToContactDetails(ContactId: number): void {
    this.contactService.setContactId(ContactId);
    this.router.navigate(['contact/details:ContactId']);
  }
}