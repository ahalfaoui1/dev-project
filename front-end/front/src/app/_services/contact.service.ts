import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
//const AUTH_API = 'http://localhost:9090/api/Contacts/';
//const AUTH_API = 'http://54.87.130.187:9090/api/Contacts/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})  
export class ContactService {
  private API_URL = environment.apiUrl + 'api/contacts/';
  private API_URL1 = environment.apiUrl + 'contacts/';
  private API_URLN = environment.apiUrl + 'api/contacts/new';
  private url ='http://localhost:9090/tasks/';
  private url1 ='http://localhost:9090/';

  
  private pageSize = 12;
  Contacts: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;

 
  //formData: FormData = new FormData();
  photo: string ='';
 // Method to fetch Contacts
 search: string = '';
statusContact: string = '';
typecontact: string = '';
selectedFileName: string = '';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private ContactIdSource = new BehaviorSubject<number | null>(null);

  currentContactId$: Observable<number | null> = this.ContactIdSource.asObservable();

  constructor(private http: HttpClient) {}
  setContactId(ContactId: number): void {
    this.ContactIdSource.next(ContactId);
  }


  uploadContact(formData: FormData): Observable<any> {
    const headers = new HttpHeaders(); 
    return this.http.post(this.API_URL + 'uploadcontacts', formData, { headers });
  }
  
  getAllContacts(page: number,search:string,statusContact:string,typecontact:string): Observable<any> {
    const apiUrl = `${this.API_URL}pages?page=${page}&size=${this.pageSize}&search=${search}&statusContact=${statusContact}&typecontact=${typecontact}`;
    return this.http.get(apiUrl, this.httpOptions);
  }

  getAllContactsNew(): Observable<any> {
    const apiUrl = `${this.API_URLN}`;
    return this.http.get(apiUrl, this.httpOptions);
  }

 
  addContact(Contact: any): Observable<any> {
    return this.http.post(this.API_URL + 'add', Contact, httpOptions);
  }

  deleteContact(id: number): Observable<any> {
    const url = `${this.API_URL}delete/${id}`; // Include ID in the URL path
    return this.http.delete(url, httpOptions);
  }
  changeimageUser(user: any): Observable<any> {
    return this.http.post(this.API_URL + 'changeimage', user, httpOptions);
  }
  getContact(id: number): Observable<any> {
    const url = `${this.API_URL}getbyid/${id}`;
    return this.http.get(url, httpOptions);
  }

  getActivityContact(): Observable<any> {
    const apiUrl = `${this.API_URL1}search/findContactsWithActivities`;
    console.log('listContactIdwithActivity',this.http.get(apiUrl, this.httpOptions))
    return this.http.get(apiUrl, this.httpOptions);
  }


  countContactsAfter7Days(){
    const url = `${this.API_URL1}search/countContactsCreatedBefore7DaysAgo`;
       return this.http.get(url, httpOptions);

  }

  countEmailnonRepondu(idContact:number){
    const url = `${this.url}search/countEmailActivitiesWithQueueRepondu?contactId=${idContact}`;
    return this.http.get(url, httpOptions);
  }

  countNouveauxLeads(){
    const url = `${this.url1}contacts/search/countNewContactsCreatedToday`;
    return this.http.get(url, httpOptions);
  }

  countEncoursLeads(){
    const url = `${this.url1}contacts/search/countEncoursLeads`;
    return this.http.get(url, httpOptions);
  }

  countConnectedLeads(){
    const url = `${this.url1}contacts/search/countConnectLeads`;
    return this.http.get(url, httpOptions);
  }

}


 
