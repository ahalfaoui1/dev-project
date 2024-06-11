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
export class MeetingService {
  private API_URL = environment.apiUrl + 'meetings?';
  private pageSize = 12;
  Meetings: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;

 


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private MeetingIdSource = new BehaviorSubject<number | null>(null);

  currentMeetingId$: Observable<number | null> = this.MeetingIdSource.asObservable();

  constructor(private http: HttpClient) {}
  setMeetingId(MeetingId: number): void {
    this.MeetingIdSource.next(MeetingId);
  }

//Mise à jour
  uploadMeeting(formData: FormData): Observable<any> {
    const headers = new HttpHeaders(); 
    return this.http.post(this.API_URL + 'uploademeeting', formData, { headers });
  }
  
  //Afficher tous les Meetings
  getAllMeetings(page: number): Observable<any> {
    const apiUrl = `${this.API_URL}page=${page}&size=${this.pageSize}`;
    return this.http.get(apiUrl, this.httpOptions);
  }

 //Ajouter un Meeting
  addMeeting(Meeting: any): Observable<any> {
    return this.http.post(this.API_URL + 'add', Meeting, httpOptions);
  }

  //supprimer un Meeting
  deleteMeeting(id: number): Observable<any> {
    const url = `${this.API_URL}delete/${id}`; // Include ID in the URL path
    return this.http.delete(url, httpOptions);
  }

}