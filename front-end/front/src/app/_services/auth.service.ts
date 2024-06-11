import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
//const AUTH_API = 'http://localhost:9090/api/auth/';
//const AUTH_API = 'http://54.87.130.187:9090/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
   
@Injectable({
  providedIn: 'root',
})
export class AuthService {


  private API_URL = environment.apiUrl + 'api/users/';
  private AUTH_API = environment.apiUrl + 'api/auth/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      this.AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }
  resetpassword(email: string): Observable<any> {
    return this.http.post(
      this.AUTH_API + 'reset',
      {
        email,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      this.AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(this.AUTH_API + 'signout', { }, httpOptions);
  }

  refreshToken() {
    return this.http.post(this.AUTH_API + 'refreshtoken', { }, httpOptions);
  }
}
