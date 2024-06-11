import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EmailService } from '../_services/email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.css'
})
export class EmailsComponent {
  emails: any =[];
  search: string = '';
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 12;
  constructor(private modalService: BsModalService,private httpClient: HttpClient,private emailService: EmailService, private router: Router){}
  
  ngOnInit(){
    this.getEmails(this.currentPage);
  }
  getEmails(page: number ): void {
    // console.log(' fetching Note:', page);
    this.emailService.getAllEmails(page).subscribe({
      next: (response) => {
        this.emails = response._embedded.emails;
        this.totalPages = response.page.totalPages;
        console.log(' fetching Email:', response._embedded.emails);
      },
      error: (error) => {
        console.error('Error fetching Email:', error);
 
      }
    });
}
}