
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

import {  TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  modalRef?: BsModalRef;
  modalRef1?: BsModalRef;
  constructor(private modalService: BsModalService,private httpClient: HttpClient,private userService: UserService, private router: Router) {}
  image: string ='';
  formData = {
    username: '',
    firstname: '',
    lastname: '', 
    roles: '1',
    email: '',
    tel: '',
    password: '',
    repassword:'',
    imageDecode: '',
  };
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
      this.image = reader.result as string;
      const base64String = reader.result as string;
      this.formData.imageDecode = base64String.split(',')[1]; 
         };
    reader.readAsDataURL(file);
  }
}
submitUserForm(): void {
  this.closeModal();
  console.log('user this.formData successfully:', this.formData);
  //console.log('User added successfully:', this.formData.imageDecode);

  this.userService.addUser(this.formData).subscribe({
    next: response => {
      console.log('User added successfully:', response);
    },
    error: err => {
      console.log('user added successfully:', err);
    }
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
}
