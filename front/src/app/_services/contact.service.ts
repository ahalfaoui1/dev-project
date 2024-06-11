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

//Mise à jour
updateContact(Contact: any): Observable<any> {
  return this.http.put(`${this.API_URL}update/${Contact.id}`, Contact, httpOptions);
  
}

//chargement
  uploadContact(formData: FormData): Observable<any> {
    const headers = new HttpHeaders(); 
    return this.http.post(this.API_URL + 'uploadcontacts', formData, { headers });
  }
  
  //Afficher tous les contacts
  getAllContacts(page: number,search:string,status:string,type:string): Observable<any> {
    //console.log('this',status);
    const apiUrl = `${this.API_URL}pages?page=${page}&size=${this.pageSize}&Search=${search}&Status=${status}&Type=${type}`;
    return this.http.get(apiUrl, this.httpOptions);
  }

 //Ajouter un contact
  addContact(Contact: any): Observable<any> {
    return this.http.post(this.API_URL + 'add', Contact, httpOptions);
  }

  //supprimer un contact
  deleteContact(id: number): Observable<any> {
    const url = `${this.API_URL}delete/${id}`; // Include ID in the URL path
    return this.http.delete(url, httpOptions);
  }

  //Modifier la photo
  changeimageUser(user: any): Observable<any> {
    return this.http.post(this.API_URL + 'changeimage', user, httpOptions);
  }

  //Afficher un contact par id
  getContact(id: number): Observable<any> {
    const url = `${this.API_URL}getbyid/${id}`;
    return this.http.get(url, httpOptions);
  }

}


 
