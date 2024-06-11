import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EntrepriseService } from '../_services/entreprise.service';

import { countries } from '../_shared/pays-data-store';
import {  TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


interface ApiResponse {
    content: any[];
    totalPages: number;
}

@Component({
    selector: 'app-entreprise',
    templateUrl: './entreprise.component.html',
    styleUrls: ['./entreprise.component.css']
})
export class EntrepriseComponent implements OnInit {
  modalRef?: BsModalRef;

 
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
  closeModal() {
    this.modalService.hide();
  }
  activityArea: string='';
  type: string = '';
  search: string = '';

  
  selectedFileName: string = '';
  formDatafile: FormData = new FormData();
  openModalimport(template: TemplateRef<any>): BsModalRef {
    return this.modalService.show(
      template,
      { class: ' modal-dialog-centered',
        ignoreBackdropClick: true, 
        keyboard: false
      });
  }


  onFileEntrepriseChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.formDatafile.append('file', file);
      this.selectedFileName = file.name;
    }
  }
  submitImportEntrepriseForm(): void {
    this.closeModal();
    
    this.entrepriseService.uploadEntreprise(this.formDatafile).subscribe({
      next: response => {
        console.log('Importation des entreprises réussie :', response);
        // Assuming getAllContacts and currentPage are declared and defined properly
        this.getAllEntreprises(this.currentPage,this.search,this.activityArea,this.type);
      },
      error: err => {
        console.log('Erreur lors de l\'ajout des entreprises :', err);
      }
    });
  }

  Entreprises: any[] = [];
  public countries :any = countries;

  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 12;
  //formData: FormData = new FormData();
   photo: string ='';

  formData = {
    name: '',
    type: 'Client',
    tel: '',
    email: '',
    imageCode: '',
    activityArea:'',
    adress:'',
    zipCode:'',
    emplyeeNb:'',
    linkedin: '',
    timeZone:'',
    webSite:'',
    description:'',
    city:'',
    country:''
  //  CompanyOwner:''
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

  deleteEntreprise(id: number): void {
    this.closeModal();
    console.log('Deleting Entreprise:', id);

    this.entrepriseService.deleteEntreprise(id).subscribe({
      next: (response) => {
        console.log('Entreprise deleted successfully:', response);
        this.getAllEntreprises(this.currentPage,this.search,this.activityArea,this.type); // Refresh lead list or display success message
      },
      error: (error) => {
        console.error('Error deleting Entreprise:', error);
        // Handle error gracefully (display error message to user, offer retry option)
      }
    });
  }
  constructor(private modalService: BsModalService,private httpClient: HttpClient,private entrepriseService: EntrepriseService, private router: Router) {}
  
  ngOnInit(): void {
    this.getAllEntreprises(this.currentPage,this.search,this.activityArea,this.type);
  }

  submitEntrepriseForm(): void {
    this.closeModal();
    console.log('To saving:', this.formData.imageCode);

    this.entrepriseService.addEntreprise(this.formData).subscribe({
      next: response => {
        console.log('Entreprise added successfully:', response);
       
        this.getAllEntreprises(this.currentPage,this.search,this.activityArea,this.type);
        // Handle success as needed
      },
      error: err => {
        console.log('Error saving:', err);
      }
    });
  }
  getAllEntreprises(page: number, search: string, activityArea: string, type: string ): void {
 
   
   this.entrepriseService.getAllEntreprises(page,this.search,this.activityArea,this.type).subscribe({
     next: (response) => {
      this.Entreprises = response.content;
        this.totalPages = response.totalPages;
      
     },
     error: (error) => {
       console.error('Error fetching company:', error);
       // Handle error gracefully (display error message to user, offer retry option)
     }
   });
 }
 onSearch(event: any) {
  this.search=event.target.value.toUpperCase()
  const inputValue = event.target.value.toUpperCase();// Get the value of the input field
  console.log('this.Entreprie',this.search);
  this.getAllEntreprises(this.currentPage,inputValue,this.activityArea,this.type); // Fetch leads when search criteria change
}
onActivityArea(event: any) {
  this.activityArea=event.target.value.toUpperCase()
  const inputValue = event.target.value.toUpperCase();// Get the value of the input field
  console.log('this.Entreprie',this.activityArea);
  this.getAllEntreprises(this.currentPage,this.search,inputValue,this.type); // Fetch leads when search criteria change
}

onSelectTypecontact(selectedType: string) {
  this.type = selectedType; // Update statusContact criteria with selected status
  console.log('this.Entreprise',this.type);
  this.getAllEntreprises(this.currentPage,this.search,this.activityArea,this.type); // Fetch Contacts when statusContact criteria change
}



  onPageChange(page: number) {
    this.currentPage=page;
      this.getAllEntreprises(page,this.search,this.activityArea,this.type);
  }
  
  pagesArray(): number[] {
    return Array.from({ length: this.totalPages || 1 }, (_, i) => i + 1);
  }

  onPreviousNextPage(page: number) {
    this.currentPage=page;
      this.getAllEntreprises(page,this.search,this.activityArea,this.type);
  }

  resetFilters() {
    this.getAllEntreprises(0,this.search,this.activityArea,this.type);
  }


  navigateToEntrepriseDetails(EntrepriseId: number): void {
    this.entrepriseService.setEntrepriseId(EntrepriseId);
    this.router.navigate(['entreprise/details']);
  }
}