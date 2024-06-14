import { Component, TemplateRef } from '@angular/core';
import { EntrepriseService } from '../_services/entreprise.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import {  OnInit, inject } from '@angular/core';

import { Location } from '@angular/common';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  note_Entreprise: any;
  note_EntrepriseDelete:any;
  totalPages: number = 0;
 // id:number = 4;
  currentPage: number = 0;
  desc: string ='';
  dateCreated:any;
  currentUrl: any;

  idNote:any;
  
  id:any;
  id2: any;
  private route = inject(ActivatedRoute);


  formData = {
    description: '',
    dateCreated: '',
    dateUpdated: '', 
    dateDeletedAt: '',
  

  };

  
  modalRef?: BsModalRef;
  modalRef1?: BsModalRef;

  constructor(private EntrepriseService: EntrepriseService,private modalService: BsModalService, private location: Location) {}

  

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('le id est:',this.id)
    //this.currentUrl = this.location.path().includes('entreprise');
    this.currentUrl = this.location.path().includes('entreprise/details/'+this.id);
    console.log('URL complète : ', this.currentUrl);
   // this.getNoteEntreprises(this.currentPage)
    this.appelDeMethode()
   
   }

   
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

 closeModal(): void{
  this.modalService.hide();
 }




  getNoteEntreprises(page: number ): void {
   console.log('hello boy')
   this.EntrepriseService.getNoteEntreprise(page,this.id).subscribe({
     next: (response) => {
      console.log('les Notes dans le Response sont:',response)
        this.note_Entreprise = response._embedded.notes;
        this.totalPages = response.totalPages;
        console.log('le content NodeEntreprise est:',this.note_Entreprise
        )  
     },
     error: (error) => {
      console.log('le esponse sont:',this.note_Entreprise)
       console.error('Error fetching lead:', error);
       // Handle error gracefully (display error message to user, offer retry option)
     }
   });
  }

  

  getNoteEntreprisesCompany(page: number): void {
    console.log('hello boy')
   
    this.EntrepriseService.getNoteEntrepriseCompany(page,this.id).subscribe({
      next: (response) => {
       console.log('les Notes avec Companys dans le Response sont:',response)
         this.note_Entreprise = response._embedded.notes;
         this.totalPages = response.totalPages;
         console.log('le content NodeEntrepriseCompanys sont:',this.note_Entreprise
         )  
      },
      error: (error) => {
       console.log('le esponse sont:',this.note_Entreprise)
        console.error('Error fetching lead:', error);
        // Handle error gracefully (display error message to user, offer retry option)
      }
    })
   }


   appelDeMethode(): void {
    if (this.currentUrl) {
      this.getNoteEntreprisesCompany(this.currentPage);
    } else {
      this.getNoteEntreprises(this.currentPage);
    }
  }





  addnoteContact(iD:any, note:any):void{ 
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('note this.formData successfully et le ID:', this.id,this.formData);
    this.EntrepriseService.addNote(iD, note).subscribe({
      next: response => {
        console.log('Note added successfully:', response);
        this.getNoteEntreprises(this.currentPage);
       
        // Handle success as needed
      },
      error: err => {
        console.log('Note added successfully:', err);

      }   
    });
  }


  addnoteCompany(iD: any, note: any){

    this.EntrepriseService.addNoteCompany(iD, note).subscribe({
      next: response => {
        console.log('Note added successfully:', response);
        this.getNoteEntreprisesCompany(this.currentPage);
       
        // Handle success as needed
      },
      error: err => {
        console.log('Note added successfully:', err);
      }   
    });
  }

  submitNoteContact(id: any, formData:any):void{
    const note = this.formData
    if (this.currentUrl) {
      this.addnoteCompany(id, note);
    } else {
      this.addnoteContact(id,note);
    }

  }

  deleteNote(index: number): void {
    // const aa = this.note_Entreprise[1]._links.note.href
    // console.log('lurl est :',aa);
    // console.log('Indice de l\'élément cliqué :', index);
    this.closeModal();

    const url = this.note_Entreprise[index]._links.note.href;
    const parts = url.split('/');
    const id2 = parts[parts.length - 1];
    console.log('ID extrait de l\'URL :', id2);

    this.EntrepriseService.deleteNote(id2).subscribe({
      next: (response) => {
        console.log('note deleted successfully:', response);
         this.getNoteEntreprises(this.currentPage); // Refresh lead list or display success message
      },
      error: (error) => {
        console.error('Error deleting lead:', error);
        // Handle error gracefully (display error message to user, offer retry option)
      }
    });
  }




}
