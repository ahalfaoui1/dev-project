import { Component, TemplateRef } from '@angular/core';
import { EntrepriseService } from '../_services/entreprise.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {  OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.css'
})
export class EmailsComponent {


  Email_Entreprise: any;
  totalPages: number = 0;
 // id:number = 1;
  currentPage: number = 0;
  id:any;
  currentUrl: any;
  inputDisabled: boolean = true;
  form!:FormGroup;
  email :any={};
  index:any

  getbyId:any;
 


  private route = inject(ActivatedRoute);





  constructor(private EntrepriseService: EntrepriseService,private modalService: BsModalService,
     private router: Router, private location: Location,private formBuilder:FormBuilder) {}
  modalRef?: BsModalRef;
  modalRef1?: BsModalRef;
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

openEditModal(template: TemplateRef<any>): BsModalRef {
  return this.modalService.show(
    template,
    { class: ' modal-dialog-centered',
      ignoreBackdropClick: true, 
      keyboard: false
    });
 }

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('le id est:',this.id)
    this.currentUrl = this.location.path().includes('entreprise/details/'+this.id);
    console.log('URL complète : ', this.currentUrl);
    console.log('hello Emails')
    this.appelDeMethode()
   }

   closeModal() {
    this.modalService.hide();
  }

   formData = {
    recipient: '',
    sender: '',
    subject: '', 
    description: ''
  };


  getEmailEntreprises(id: number ): void {
    this.EntrepriseService.getEmailEntreprise(this.id).subscribe({
     next: (response) => {
      console.log('les Response Emails sont:',response)

      this.Email_Entreprise = response._embedded.emails;
      console.log('les emails Contact sont:', this.Email_Entreprise)
        // this.totalPages = response.totalPages;
      
     },
     error: (error) => {
       console.error('Error fetching email:', error);
       // Handle error gracefully (display error message to user, offer retry option)
     }
   });
  }

  getEmailEntreprisesCompany(page: number): void {
    console.log('hello boy')
   
    this.EntrepriseService.getEmailEntrepriseCompany(page,this.id).subscribe({
      next: (response) => {
       console.log('les EmailCompany avec Companys dans le Response sont:',response)
         this.Email_Entreprise = response._embedded.emails;
         this.totalPages = response.totalPages;
         console.log('le content EmailCompany  EmailEntrepriseCompanys sont:',this.Email_Entreprise
         )  
      },
      error: (error) => {
       console.log('le esponse sont:',this.Email_Entreprise)
        console.error('Error fetching lead:', error);
        // Handle error gracefully (display error message to user, offer retry option)
      }
    })
   }


   appelDeMethode(): void {
    if (this.currentUrl) {
      this.getEmailEntreprisesCompany(this.currentPage);
    } else {
      this.getEmailEntreprises(this.currentPage);
    }
  }
  
  

  //  getEntreprise(id: number): void {
  
  //   this.EntrepriseService.getEntreprise(id).subscribe({
  //     next: (response) => {
  //    this.Entreprise=response;
  //    console.log('le nom est',this.Entreprise.activities);
  //     },
  //     error: (error) => {
  //       console.error('Error get user:', error);
    
  //     }
  //   });
  // }


  addEmailContact(iD:any, note:any):void{ 
    // this.closeModal();
 
     const id = Number(this.route.snapshot.paramMap.get('id'));
     console.log('email this.formData successfully et le ID:', this.id,this.formData);
     this.EntrepriseService.addEmail(iD, note).subscribe({
       next: response => {
         console.log('Email added successfully:', response);
         this.getEmailEntreprises(this.currentPage);
        
         // Handle success as needed
       },
       error: err => {
         console.log('Email added successfully:', err);
       }   
     });
   }



   addEmailCompany(iD: any, note: any){
    this.EntrepriseService.addEmailCompany(iD, note).subscribe({
      next: response => {
        console.log('Email added successfully:', response);
        this.getEmailEntreprisesCompany(this.currentPage);
       
        // Handle success as needed
      },
      error: err => {
        console.log('Email added successfully:', err);
      }   
    });
  }








  submit(id: any, formData:any):void{ 
    this.closeModal()
    const note = this.formData

    if (this.currentUrl) {
      this.addEmailCompany(id, note);
    } else {
      this.addEmailContact(id,note);
    }
 }




 modifierMail(index: number,formData:any) {
  const url = this.Email_Entreprise[index]._links.email.href;
  const parts = url.split('/');
  const id2 = parts[parts.length - 1];
  console.log('ID extrait de l\'URL :', id2);

  const emailu: any = {
      
    id:id2,
    recipient:formData.recipient,
    sender:formData.sender,
    subject:formData.subject,
    description:formData.description
  };
 
  console.log('this.emailUpdate a pour le  modifié est : ', emailu);
  this.EntrepriseService.modifierMail(id2, emailu).subscribe(response => {
    // Gérer la réponse du serveur si nécessaire
   // console.log('this.email a pour le  modifié est : ', this.email);

    console.log('Mail modifié avec succès : ', response);

  }, error => {
    // Gérer les erreurs si nécessaire
    console.error('Erreur lors de la modification du mail : ', error);
  });
}

 


}
