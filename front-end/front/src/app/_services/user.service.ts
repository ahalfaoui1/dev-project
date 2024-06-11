


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
//const API_URL = 'http://localhost:9090/api/users/';
//const API_URL = 'http://54.87.130.187:9090/api/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})  

@Injectable({
  providedIn: 'root',
})
export class UserService {

  roleName='COMMERCIAL'
  
  private API_URL = environment.apiUrl + 'api/users/';
  private API_URL1 = environment.apiUrl + 'users/';
  private pageSize = 12;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) {}
  private userIdSource = new BehaviorSubject<number | null>(null);

  currentUserId$: Observable<number | null> = this.userIdSource.asObservable();


  getUsersCommercial(): Observable<any> {
    const apiUrl = `${this.API_URL1}search/findByRoleName?roleName=${this.roleName}`;
    return this.http.get(apiUrl, this.httpOptions);
  }


  getPublicContent(): Observable<any> {
    return this.http.get(this.API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'admin', { responseType: 'text' });
  }


  getUser(id: number): Observable<any> {
    const url = `${this.API_URL}getbyid/${id}`;
    return this.http.get(url, httpOptions);
  }
  setUserId(userId: number): void {
    this.userIdSource.next(userId);
  }



  getAllUsers(page: number): Observable<any> {
    const apiUrl = `${this.API_URL}pages?page=${page}&size=${this.pageSize}`;
    return this.http.get(apiUrl, this.httpOptions);
  }

 

  addUser(lead: any): Observable<any> {
    return this.http.post(this.API_URL + 'add', lead, httpOptions);
  }

  changeimageUser(user: any): Observable<any> {
    return this.http.post(this.API_URL + 'changeimage', user, httpOptions);
  }
  changePasswordUser(user: any): Observable<any> {
    return this.http.post(this.API_URL + 'changepassword', user, httpOptions);
  }
  verifierpassword(user: any): Observable<any> {
    return this.http.post(this.API_URL + 'verifpassword', user, httpOptions);
  }
  configmail(user: any): Observable<any> {
    return this.http.post(this.API_URL + 'configmail', user, httpOptions);
  }

  deleteUser(id: number): Observable<any> {
    const url = `${this.API_URL}delete/${id}`; // Include ID in the URL path
    return this.http.delete(url, httpOptions);
  }
 
}
