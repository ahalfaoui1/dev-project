import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ContactService } from '../../_services/contact.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntrepriseService } from '../../_services/entreprise.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrl: './recap.component.css',

})
export class RecapComponent {
  activeTab: string = 'tasks';
  contactWithActivity:any;
  contact:any;
  search:any
  task_Entreprise: any;
  task_EntrepriseRiminder:any;
  totalPages: number = 0;
  id:any;
  index:any;
  currentPage: number = 0;
  task_ContactAfterDate: any;
  task_ContactBeforeDate: any;
  resultContactAfterDate_Expiration:any;
  resultContactBeforDate_Expiration:any;

  resultCountAfterAFAIRE:any;
  resultCountBeforeAFAIRE:any;
  resultCountEqualAFAIRE:any;

  resultCountAfterAPPEL:any;
  resultCountBeforeAPPEL:any;
  resultCountEqualAPPEL: any;

  resultCountAfterEMAIL:any;
  resultCountBeforeEMAIL:any;
  resultCountEqualEMAIL:any;


  true:boolean = true;


  mydate = new Date();
  daTe:any;



  form!:FormGroup;


  constructor(private contactService: ContactService,
    private formBuilder:FormBuilder,private EntrepriseService: EntrepriseService,
    private datePipe: DatePipe ) {    this.daTe = this.datePipe.transform(this.mydate, 'yyyy-MM-dd');
    }

  ngOnInit(): void {
console.log('hello in prosprection')
this.getContactWithActivity()
this.initForm()
}


private initForm(){
  this.form = this.formBuilder.group({
    contact:['']
  })
}


// -------------------------------GET TOUS LES CONTACT QUI TROUVER DANS ACTIVITI-----------------------------------------
getContactWithActivity(): void {
 
  console.log('hello boy')
 this.contactService.getActivityContact().subscribe({
   next: (response) => {

      this.contactWithActivity = response._embedded.contacts
      this.contact= response
      console.log('res',this.contactWithActivity)
    
   },
   error: (error) => {
    console.log('le esponse sont:',this.contactWithActivity)
     console.error('Error fetching lead:', error);
   }
 });
}



// -------------------------------GET TASK AVEC LE CONTACT_ID -----------------------------------------
getContactIdByActivity(page:number,id:number):void{
  console.log("le index=",id);
  console.log("le Date:",this.daTe)

  //-------------SERVICE GET LE NOMBRE DES TASKS ADMET LE TYPE A FAIRE EQUAL DATE_EXPIRATION----------
  this.EntrepriseService.countTaskEqualDate_Expiration(id).subscribe((response)=>{
    this.resultCountEqualAFAIRE=response;
    console.log('le Nombre de task Equal Date expiration admet A faire est :', this.resultCountEqualAFAIRE)
  })
//-------------SERVICE GET LE NOMBRE DES TASKS ADMET LE TYPE A FAIRE AFTER DATE_EXPIRATION----------
  this.EntrepriseService.countTaskAfterDate_Expiration(id).subscribe((response)=>{
    this.resultCountAfterAFAIRE=response;
    console.log('le Nombre de task After Date expiration admet A faire est :', this.resultCountAfterAFAIRE)
  })
//-------------SERVICE GET LE NOMBRE DES TASKS ADMET LE TYPE A FAIRE BEFORE DATE_EXPIRATION----------
this.EntrepriseService.countTaskBeforeDate_Expiration(id).subscribe((response)=>{
  this.resultCountBeforeAFAIRE=response;
  console.log('le Nombre de task Before Date expiration admet A faire est :', this.resultCountBeforeAFAIRE)
})

//---------------------------------------------------------------------------------------------------------

//-------------SERVICE GET LE NOMBRE DES TASKS ADMET LE TYPE APPEL AFTER DATE_EXPIRATION----------
this.EntrepriseService.countTaskAfterDate_ExpirationAppel(id).subscribe((response)=>{
  this.resultCountAfterAPPEL=response;
  console.log('le Nombre de task After Date expiration admet Appel est :', this.resultCountAfterAPPEL)
})
//-------------SERVICE GET LE NOMBRE DES TASKS ADMET LE TYPE A FAIRE BEFORE DATE_EXPIRATION----------
this.EntrepriseService.countTaskBeforeDate_ExpirationAppel(id).subscribe((response)=>{
this.resultCountBeforeAPPEL=response;
console.log('le Nombre de task Before Date expiration admet APPEL est :', this.resultCountBeforeAPPEL)
})
//-------------SERVICE GET LE NOMBRE DES TASKS ADMET LE TYPE APPEL Equal DATE_EXPIRATION----------
this.EntrepriseService.countTaskEqualDate_ExpirationAppel(id).subscribe((response)=>{
  this.resultCountEqualAPPEL=response;
  console.log('le Nombre de task Equal Date expiration admet Appel est :', this.resultCountEqualAPPEL)
})

//---------------------------------------------------------------------------------------------------------

//-------------SERVICE GET LE NOMBRE DES TASKS ADMET LE TYPE EMAIL EQUAL DATE_EXPIRATION----------
this.EntrepriseService.countTaskEqualDate_ExpirationEmail(id).subscribe((response)=>{
  this.resultCountEqualEMAIL=response;
  console.log('le Nombre de task Equal Date expiration admet EMAIL est :', this.resultCountEqualEMAIL)
})
//-------------SERVICE GET LE NOMBRE DES TASKS ADMET LE TYPE EMAIL BEFORE DATE_EXPIRATION----------
this.EntrepriseService.countTaskBeforeDate_ExpirationEmail(id).subscribe((response)=>{
  this.resultCountBeforeEMAIL=response;
  console.log('le Nombre de task Before Date expiration admet EMAIL est :', this.resultCountBeforeEMAIL)
})

//-------------SERVICE GET LE NOMBRE DES TASKS ADMET LE TYPE EMAIL AFTER DATE_EXPIRATION----------
this.EntrepriseService.countTaskAfterDate_ExpirationEmail(id).subscribe((response)=>{
  this.resultCountAfterEMAIL=response;
  console.log('le Nombre de task After Date expiration admet EMAIL est :', this.resultCountAfterEMAIL)
})




  // this.EntrepriseService.getTaskWithContactId_BeforeExpirationDate(id).subscribe((response)=>{
  //   this.task_ContactBeforeDate=response
  //   this.resultContactBeforDate_Expiration= this.task_ContactBeforeDate._embedded.tasks
  //   console.log('le task Before Date-expiration sont:',this.resultContactBeforDate_Expiration[0].type);
  // })

  // this.EntrepriseService.getTaskWithContactId_AfterExpirationDate(id).subscribe((response)=>{
  //   this.task_ContactAfterDate=response;
  //   this.resultContactAfterDate_Expiration= this.task_ContactAfterDate._embedded.tasks
  //   console.log('le task After Date-expiration sont:',this.resultContactAfterDate_Expiration[0].type);
  // })




  this.EntrepriseService.getTasksEntreprise(page,id).subscribe({
    next: (response) => {
 
       this.task_Entreprise = response._embedded.tasks;
       this.totalPages = response.totalPages;
       console.log('les Task Contact TasksEntreprise :',this.task_Entreprise
       )
     
    },
    error: (error) => {
     console.log('le esponse sont:',this.task_Entreprise)
      console.error('Error fetching lead:', error);
      // Handle error gracefully (display error message to user, offer retry option)
    }
  });

  


}






// getTasksEntreprises(page: number ): void {
 
//   console.log('hello boy')
//  this.EntrepriseService.getTasksEntreprise(page,this.id).subscribe({
//    next: (response) => {

//       this.task_Entreprise = response._embedded.tasks;
//       this.totalPages = response.totalPages;
//       console.log('les Task Contact TasksEntreprise est:',this.task_Entreprise
//       )
    
//    },
//    error: (error) => {
//     console.log('le esponse sont:',this.task_Entreprise)
//      console.error('Error fetching lead:', error);
//      // Handle error gracefully (display error message to user, offer retry option)
//    }
//  });
// }





  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
