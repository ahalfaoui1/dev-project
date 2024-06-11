import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

import {  TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EnvService } from '../_services/env.service';
//const API_URL = 'http://54.87.130.187:9090/api/users/';
//const API_URL = 'http://localhost:9090/api/users/';

interface ApiResponse {
    content: any[];
    totalPages: number;
}

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 
  //API_URL: string ='';
  modalRef?: BsModalRef;
  modalRef1?: BsModalRef;
  constructor( private envService: EnvService,private modalService: BsModalService,private httpClient: HttpClient,
    private userService: UserService, private router: Router) {}
  ngOnInit(): void {
   
    this.getAllUsers(this.currentPage);
  }
  getAllUsers(page: number) {
  this.userService.getAllUsers(page).subscribe({
    next: response => {
      this.users = response.content;
      this.totalPages = response.totalPages;
      // Handle success as needed
    },
    error: err => {
      console.log('user added successfully:', err);
    }
  });
}/*
  getAllUsers(page: number) {
    const apiUrl = `${this.API_URL}pages?page=${page}&size=${this.pageSize}`;
  
    this.httpClient.get<ApiResponse>(apiUrl).subscribe(
      (response) => {
        this.users = response.content;
        this.totalPages = response.totalPages;
      
      },
      (error) => {
        console.error('Error fetching leadrs:', error);
      }
    );
  }*/

  openModal(template: TemplateRef<any>): BsModalRef {
    return this.modalService.show(
      template,
      { class: 'modal-lg modal-dialog-centered',
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
statusUser: string = '';
onStatususer(selectedStatus: string) {
  this.statusUser = selectedStatus; // Update statusLead criteria with selected status
  console.log('this.lead',this.statusUser);
  this.getAllUsers(this.currentPage); // Fetch leads when statusLead criteria change
}
search: string = '';
onSearch(event: any) {
  const inputValue = event.target.value; // Get the value of the input field
  this.search=inputValue;
  this.getAllUsers(this.currentPage); // Fetch leads when search criteria change
}
  closeModal() {
    this.modalService.hide();
  }

  users: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 12;
  //formData: FormData = new FormData();
   image: string ='';

  formData = {
    username: '',
    firstname: '',
    lastname: '', 
    roles: 'USER',
    email: '',
    tel: '',
    password: '',
    repassword:'',
    imageDecode: '',
  };
  
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.onload = () => {
        this.image = reader.result as string;
        const base64String = reader.result as string;
        this.formData.imageDecode = base64String.split(',')[1]; 
           };
      reader.readAsDataURL(file);
    }
  }

  deleteUser(id: number): void {
    this.closeModal();
    console.log('Deleting lead:', id);

    this.userService.deleteUser(id).subscribe({
      next: (response) => {
        console.log('user deleted successfully:', response);
        this.getAllUsers(this.currentPage); // Refresh lead list or display success message
      },
      error: (error) => {
        console.error('Error deleting lead:', error);
        // Handle error gracefully (display error message to user, offer retry option)
      }
    });
  }

  


  submitUserForm(): void {
    this.closeModal();
    console.log('user this.formData successfully:', this.formData);
    //console.log('User added successfully:', this.formData.imageDecode);

    this.userService.addUser(this.formData).subscribe({
      next: response => {
        console.log('User added successfully:', response);

        this.getAllUsers(this.currentPage);
        // Handle success as needed
      },
      error: err => {
        console.log('user added successfully:', err);
      }
    });
  }


 




  onPageChange(page: number) {
    this.currentPage=page;
      this.getAllUsers(page);
  }
  
  pagesArray(): number[] {
    return Array.from({ length: this.totalPages || 1 }, (_, i) => i + 1);
  }

  onPreviousNextPage(page: number) {
    this.currentPage=page;
      this.getAllUsers(page);
  }

  resetFilters() {
    this.getAllUsers(0);
  }


  navigateTouserDetails(userId: number): void {
    this.userService.setUserId(userId);
    this.router.navigate(['user/details']);
  }
}