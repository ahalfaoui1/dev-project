import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private API_URL = environment.apiUrl +'notes';
  private pageSize = 20;
  Notes: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;

 


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private NoteIdSource = new BehaviorSubject<number | null>(null);

  currentNoteId$: Observable<number | null> = this.NoteIdSource.asObservable();

  constructor(private http: HttpClient) {}
  setNoteId(NoteId: number): void {
    this.NoteIdSource.next(NoteId);
  }

//Mise à jour
  uploadNote(formData: FormData): Observable<any> {
    const headers = new HttpHeaders(); 
    return this.http.post(this.API_URL + 'uploadenote', formData, { headers });
  }
  
  //Afficher toutes les Notes
 // http://localhost:9090/notes?page=0&size=20
  getAllNotes(page: number): Observable<any> {
    const apiUrl = `${this.API_URL}?page=${page}&size=${this.pageSize}`;
  //  const apiUrl = `${this.API_URL}page=${page}`;
  return this.http.get(apiUrl, this.httpOptions);
  }


 //Ajouter une Note
  addNote(Note: any): Observable<any> {
    return this.http.post(this.API_URL, Note, httpOptions);
  }

  //supprimer une Note
  deleteNote(id: number): Observable<any> {
    const url = `${this.API_URL}delete/${id}`; // Include ID in the URL path
    return this.http.delete(url, httpOptions);
  }

}
