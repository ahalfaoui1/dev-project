import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})  
export class EntrepriseService {
  private API_URL = environment.apiUrl + 'api/companys/';
  private EntrepriseIdSource = new BehaviorSubject<number | null>(null);
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  private pageSize = 12;
  Entreprises: any[] = [];
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

  constructor(private http: HttpClient) {}
  setEntrepriseId(EntrepriseId: number): void {
    this.EntrepriseIdSource.next(EntrepriseId);
  }

//Mise à jour
updateEntreprise(Entreprise: any): Observable<any> {
  return this.http.put(`${this.API_URL}update/${Entreprise.id}`, Entreprise, httpOptions);
  
}

  uploadEntreprise(formData: FormData): Observable<any> {
    const headers = new HttpHeaders(); 
    return this.http.post(this.API_URL + 'uploadentreprises', formData, { headers });
  }
  
  getAllEntreprises(page: number,search:string,activityArea:string,type:string): Observable<any> {
    const apiUrl = `${this.API_URL}pages?page=${page}&size=${this.pageSize}&Search=${search}&ActivityArea=${activityArea}&Type=${type}`;
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

}