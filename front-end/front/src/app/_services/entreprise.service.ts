import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})  
export class EntrepriseService {
  private API_URL = environment.apiUrl + 'api/companys/';
  private API_URLNote = environment.apiUrl + 'notes';
  private API_URLEmail = environment.apiUrl + 'emails';
  private API_URLTasks = environment.apiUrl + 'tasks';
  private API_URLMeetings = environment.apiUrl + 'meetings';



  private EntrepriseIdSource = new BehaviorSubject<number | null>(null);
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  private pageSize = 12;
  Entreprises: any[] = [];
  Note: any[] = [];
  date =Date.now();
  mydate = new Date();
  formattedDate:any;


  totalPages: number = 0;
  currentPage: number = 0;

 
  //formData: FormData = new FormData();
  photo: string ='';
 // Method to fetch leads
 search: string = '';
statusLead: string = '';
typecontact: string = '';
selectedFileName: string = '';

  currentEntrepriseId$: Observable<number | null> = this.EntrepriseIdSource.asObservable();

  constructor(private http: HttpClient,private datePipe: DatePipe) {
    this.formattedDate = this.datePipe.transform(this.mydate, 'yyyy-MM-dd');

  }
  setEntrepriseId(EntrepriseId: number): void {
    this.EntrepriseIdSource.next(EntrepriseId);
  }


  uploadEntreprise(formData: FormData): Observable<any> {
    const headers = new HttpHeaders(); 
    return this.http.post(this.API_URL + 'uploadentreprises', formData, { headers });
  }
  
  getAllEntreprises(page: number,search:string,statusLead:string,typecontact:string): Observable<any> {
    const apiUrl = `${this.API_URL}pages?page=${page}&size=${this.pageSize}&search=${search}&statusLead=${statusLead}&typecontact=${typecontact}`;
    return this.http.get(apiUrl, this.httpOptions);
  }
  
   
 
  addEntreprise(Entreprise: any): Observable<any> {
    return this.http.post(this.API_URL + 'add', Entreprise, httpOptions);
  }

  deleteEntreprise(id: number): Observable<any> {
    const url = `${this.API_URL}delete/${id}`; // Include ID in the URL path
    return this.http.delete(url, httpOptions);
  }
  changeimageEntreprise(user: any): Observable<any> {
    return this.http.post(this.API_URL + 'changeimage', user, httpOptions);
  }
  getEntreprise(id: number): Observable<any> {
    const url = `${this.API_URL}getbyid/${id}`;
    return this.http.get(url, httpOptions);
  }

  getNoteEntreprise(page: number,id: number): Observable<any> {
    const url = `${this.API_URLNote}/search/findByActivity_Contact_Id?contactId=${id}`;
    return this.http.get(url, httpOptions);
  }

  getEmailEntreprise(id: number): Observable<any> {
    const url = `${this.API_URLEmail}/search/findByActivity_Contact_Id?contactId=${id}`;
    return this.http.get(url, httpOptions);
  }

  getMettingsEntreprise(page: number,id: number): Observable<any> {
    const url = `${this.API_URLMeetings}/search/findByActivity_Contact_Id?contactId=${id}&page=${page}&size=${this.pageSize}`;
    return this.http.get(url, httpOptions);
  }

  getTasksEntreprise(page: number,id: number): Observable<any> {
    const url = `${this.API_URLTasks}/search/findByActivity_Contact_Id?contactId=${id}&page=${page}&size=${this.pageSize}`;
    return this.http.get(url, httpOptions);
  }

  getTaskWithContactId_RiminderNow(idContact:number){
    const url = `${this.API_URLTasks}/search/findTasksByContactIdAndRminderEqualsCurrentDate?contactId=${idContact}&currentDate=${this.formattedDate}`;
    return this.http.get(url, httpOptions);

  }

  getTaskWithContactId_BeforeExpirationDate(idContact:number){
    const url = `${this.API_URLTasks}/search/findTasksByContactIdAndExpirationdateBeforeCurrentDate?contactId=${idContact}&currentDate=${this.formattedDate}`;
       return this.http.get(url, httpOptions);

  }

  getTaskWithContactId_AfterExpirationDate(idContact:number){
    const url = `${this.API_URLTasks}/search/findTasksByContactIdAndExpirationdateAfterCurrentDate?contactId=${idContact}&currentDate=${this.formattedDate}`;
       return this.http.get(url, httpOptions);

  }

  countTaskEqualDate_Expiration(idContact:number){
    const url = `${this.API_URLTasks}/search/countTasksByContactIdAndExpirationdateEqualCurrentDateAndTypeIsToDo?contactId=${idContact}&currentDate=${this.formattedDate}`;
       return this.http.get(url, httpOptions);

  }

  countTaskAfterDate_Expiration(idContact:number){
    const url = `${this.API_URLTasks}/search/countTasksByContactIdAndExpirationdateAfterCurrentDateAndTypeIsToDo?contactId=${idContact}&currentDate=${this.formattedDate}`;
       return this.http.get(url, httpOptions);

  }

  countTaskBeforeDate_Expiration(idContact:number){
    const url = `${this.API_URLTasks}/search/countTasksByContactIdAndExpirationdateBeforeCurrentDateAndTypeIsToDo?contactId=${idContact}&currentDate=${this.formattedDate}`;
       return this.http.get(url, httpOptions);

  }


  countTaskEqualDate_ExpirationAppel(idContact:number){
    const url = `${this.API_URLTasks}/search/countTasksByContactIdAndExpirationdateEqualCurrentDateAndTypeIsToDoA?contactId=${idContact}&currentDate=${this.formattedDate}`;
       return this.http.get(url, httpOptions);

  }


  countTaskBeforeDate_ExpirationAppel(idContact:number){
    const url = `${this.API_URLTasks}/search/countTasksByContactIdAndExpirationdateBeforeCurrentDateAndTypeIsToDoA?contactId=${idContact}&currentDate=${this.formattedDate}`;
       return this.http.get(url, httpOptions);

  }

  countTaskAfterDate_ExpirationAppel(idContact:number){
    const url = `${this.API_URLTasks}/search/countTasksByContactIdAndExpirationdateAfterCurrentDateAndTypeIsToDoA?contactId=${idContact}&currentDate=${this.formattedDate}`;
       return this.http.get(url, httpOptions);

  }


  countTaskEqualDate_ExpirationEmail(idContact:number){
    const url = `${this.API_URLTasks}/search/countTasksByContactIdAndExpirationdateEqualCurrentDateAndTypeIsToDoE?contactId=${idContact}&currentDate=${this.formattedDate}`;
       return this.http.get(url, httpOptions);

  }

  countTaskBeforeDate_ExpirationEmail(idContact:number){
    const url = `${this.API_URLTasks}/search/countTasksByContactIdAndExpirationdateBeforeCurrentDateAndTypeIsToDoE?contactId=${idContact}&currentDate=${this.formattedDate}`;
       return this.http.get(url, httpOptions);

  }

  countTaskAfterDate_ExpirationEmail(idContact:number){
    const url = `${this.API_URLTasks}/search/countTasksByContactIdAndExpirationdateAfterCurrentDateAndTypeIsToDoE?contactId=${idContact}&currentDate=${this.formattedDate}`;
       return this.http.get(url, httpOptions);

  }




  getTasksEntreprise2(page: number,id: number): Observable<any> {
    const url = `${this.API_URLTasks}/search/findByActivity_Contact_Id?contactId=${id}&page=${page}&size=${this.pageSize}`;
    return this.http.get(url, httpOptions);
  }


  // getTasksEntreprise(id: number): Observable<any> {
  //   const url = `${this.API_URLTasks}/search/findTaskByCompanyId?contactId=${id}`;
  //   return this.http.get(url, httpOptions);
  // }



  getNoteEntrepriseCompany(page: number,id: number): Observable<any> {
    const url = `${this.API_URLNote}/search/findNotesByCompanyId?companyId=${id}&page=${page}&size=${this.pageSize}`;
    return this.http.get(url, httpOptions);
  }

  getTasksEntrepriseCmpany(page: number,id: number): Observable<any> {
    const url = `${this.API_URLTasks}/search/findTaskByCompanyId?companyId=${id}&page=${page}&size=${this.pageSize}`;
    return this.http.get(url, httpOptions);
  }



  getMettingsEntrepriseCompany(page: number,id: number): Observable<any> {
    const url = `${this.API_URLMeetings}/search/findMeetingByCompanyId?companyId=${id}&page=${page}&size=${this.pageSize}`;
    return this.http.get(url, httpOptions);
  }

  getEmailEntrepriseCompany(page: number,id: number): Observable<any> {
    const url = `${this.API_URLEmail}/search/findEmailByCompanyId?companyId=${id}&page=${page}&size=${this.pageSize}`;
    return this.http.get(url, httpOptions);
  }



  addNote(id:any, Note: any): Observable<any> {
    return this.http.post(`${this.API_URLNote}/contact/details/${id}`, Note);
  }

  addNoteCompany(id:any, Note: any): Observable<any> {
    return this.http.post(`${this.API_URLNote}/entreprise/details/${id}`, Note);
  }






  addTask(id:any, Task: any): Observable<any> {
    return this.http.post(`${this.API_URLTasks}/contact/details/${id}`, Task);
  }


  addTaskCompany(id:any, Task: any): Observable<any> {
    return this.http.post(`${this.API_URLTasks}/entreprise/details/${id}`, Task);
  }




  
  addEmail(id:any, Email: any): Observable<any> {
    return this.http.post(`${this.API_URLEmail}/contact/details/${id}`, Email);
  }


  addEmailCompany(id:any, Email: any): Observable<any> {
    return this.http.post(`${this.API_URLEmail}/entreprise/details/${id}`, Email);
  }


  // addEmail(Email: any): Observable<any> {
  //   return this.http.post(this.API_URLEmail, Email, httpOptions);
  // }


  deleteNote(id: number): Observable<any> {
    const url = `${this.API_URLNote}/delete/${id}`; // Include ID in the URL path
    return this.http.delete(url, httpOptions);
  }

  getClientById(emailId: string): Observable<any>{
    return this.http.get<any>('http://localhost:9090/emails/'+ emailId)
  }


  modifierMail(id: string, email: any): Observable<any> {
    return this.http.put<any>(`${this.API_URLEmail}/${id}`, email);
  }





}




 
