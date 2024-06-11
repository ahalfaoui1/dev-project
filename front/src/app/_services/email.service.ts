import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private API_URL = environment.apiUrl + 'emails?';
  private pageSize = 20;
  Notes: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
 


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private EmailIdSource = new BehaviorSubject<number | null>(null);

  currentEmailId$: Observable<number | null> = this.EmailIdSource.asObservable();

  constructor(private http: HttpClient) {}
  setEmailId(EmailId: number): void {
    this.EmailIdSource.next(EmailId);
  }

//Mise à jour
  uploadEmail(formData: FormData): Observable<any> {
    const headers = new HttpHeaders(); 
    return this.http.post(this.API_URL + 'uploademail', formData, { headers });
  }
  
  //Afficher tous les Emails
 // http://localhost:9090/emails?page=0&size=20
  getAllEmails(page: number): Observable<any> {
    const apiUrl = `${this.API_URL}page=${page}&size=${this.pageSize}`;
    return this.http.get(apiUrl, this.httpOptions);
  }

 //Ajouter un email
  addEmail(Email: any): Observable<any> {
    return this.http.post(this.API_URL + 'add', Email, httpOptions);
  }

  //supprimer un email
  deleteEmail(id: number): Observable<any> {
    const url = `${this.API_URL}delete/${id}`; // Include ID in the URL path
    return this.http.delete(url, httpOptions);
  }
}
