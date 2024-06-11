import { Component } from '@angular/core';
import { EntrepriseService } from '../_services/entreprise.service';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import {  OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  task_Entreprise: any;
  totalPages: number = 0;
 // id:number = 14;
  currentPage: number = 0;
  desc: string ='';
  dateCreated:any;
  currentUrl: any;

  userCommercial:any;

  id:any;
  private route = inject(ActivatedRoute);


  formData = {
  
    title: "",
    type:'',
    priorite:'',
    rappel:'',
    expirationdate: "",
    rminder: "",
    description: "",
    queue: "",
    dateCreated:"",
    dateUpdated:"",
    dateDeletedAt:""
  
  };

  constructor(private EntrepriseService: EntrepriseService,private userService: UserService, private router: Router, private location: Location) {}


  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('le id est:',this.id)
    this.currentUrl = this.location.path().includes('entreprise/details/'+this.id);
    console.log('URL complète : ', this.currentUrl)
    this.appelDeMethode()
    this.getuserCommercial();

   
   }


   getTaskEntreprisesCompany(page: number): void {
    console.log('hello boy')
    this.EntrepriseService.getTasksEntrepriseCmpany(page,this.id).subscribe({
      next: (response) => {
       console.log('les Tasks Company avec Companys dans le Response sont:',response)
         this.task_Entreprise = response._embedded.tasks;
         this.totalPages = response.totalPages;
         console.log('le content TaskEntrepriseCompanys sont:',this.task_Entreprise
         )  
      },
      error: (error) => {
       console.log('le esponse sont:',this.task_Entreprise)
        console.error('Error fetching lead:', error);
        // Handle error gracefully (display error message to user, offer retry option)
      }
    });
   }

   getTasksEntreprises(page: number ): void {
 
    console.log('hello boy')
   this.EntrepriseService.getTasksEntreprise(page,this.id).subscribe({
     next: (response) => {

        this.task_Entreprise = response._embedded.tasks;
        this.totalPages = response.totalPages;
        console.log('les Task Contact TasksEntreprise est:',this.task_Entreprise
        )
      
     },
     error: (error) => {
      console.log('le esponse sont:',this.task_Entreprise)
       console.error('Error fetching lead:', error);
       // Handle error gracefully (display error message to user, offer retry option)
     }
   });
  }

  appelDeMethode(): void {
    if (this.currentUrl) {
      this.getTaskEntreprisesCompany(this.currentPage);
    } else {
      this.getTasksEntreprises(this.currentPage);
    }
  }


  addTaskContact(iD:any, note:any):void{ 
    // this.closeModal();
 
     const id = Number(this.route.snapshot.paramMap.get('id'));
     console.log('task this.formData successfully et le ID:', this.id,this.formData);
     this.EntrepriseService.addTask(iD, this.formData).subscribe({
       next: response => {
         console.log('Task added successfully:', response);
         this.getTasksEntreprises(this.currentPage);
        
         // Handle success as needed
       },
       error: err => {
         console.log('Task added successfully:', err);
       }   
     });
   }


   addtaskCompany(iD: any, note: any){
    this.EntrepriseService.addTaskCompany(iD, note).subscribe({
      next: response => {
        console.log('Task added successfully:', response);
        this.getTaskEntreprisesCompany(this.currentPage);
       
        // Handle success as needed
      },
      error: err => {
        console.log('Task added successfully:', err);
      }   
    });
  }





  

  
  submitTaskContact(id: any, formData:any):void{ 
  // this.closeModal();

  const task = this.formData

  if (this.currentUrl) {
    this.addtaskCompany(id, task);
  } else {
    this.addTaskContact(id,task);
  }
  }


  getuserCommercial(){
    this.userService.getUsersCommercial().subscribe((res)=>{
      this.userCommercial = res;
      console.log('le user Commercial est:',res);
    })
  }



}
