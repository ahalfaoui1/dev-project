import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NoteService } from '../_services/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  search: string = '';
  notes: any =[];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 12;
  constructor(private modalService: BsModalService,private httpClient: HttpClient,private noteService: NoteService, private router: Router){}
  
  ngOnInit(){
    this.getAllNotes(this.currentPage);
  }
  openModal(template: TemplateRef<any>): BsModalRef {
    return this.modalService.show(
      template,
      { class: 'modal-lg modal-dialog-centered',
        ignoreBackdropClick: true, 
        keyboard: false
      });
}
  closeModal() {
    this.modalService.hide();
  }

  formData={
    description : '',
  };

  getAllNotes(page: number ): void {
   // console.log(' fetching Note:', page);
   this.noteService.getAllNotes(page).subscribe({
     next: (response) => {
       this.notes = response._embedded.notes;
       this.totalPages = response.page.totalPages;
       console.log(' fetching Note:', response._embedded.notes);
     },
     error: (error) => {
       console.error('Error fetching Note:', error);

     }
   });
   
}
   submitNoteForm(): void {
    console.log('To save:', this.formData);


    this.noteService.addNote(this.formData).subscribe({
     next: (response: any) => {
        console.log('Note added successfully:', response);

       this.getAllNotes(this.currentPage);
    
      },
      error: err => {
        console.log('error saving:', err);
      }
    });
  }
 
}


