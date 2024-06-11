import { Injectable } from '@angular/core';
//import { environment } from 'src/environments/environment';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    // Utilisation de l'URL de l'API à partir de l'environnement
    return this.http.get<any>(`${environment.apiUrl}`);
  }
}
