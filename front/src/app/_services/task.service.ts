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
export class TaskService {

  private API_URL = environment.apiUrl + 'tasks?';
  private pageSize = 20;
  Tasks: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;

 


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private TaskIdSource = new BehaviorSubject<number | null>(null);

  currentTaskId$: Observable<number | null> = this.TaskIdSource.asObservable();

  constructor(private http: HttpClient) {}
  setTaskId(TaskId: number): void {
    this.TaskIdSource.next(TaskId);
  }

//Mise à jour
  uploadTask(formData: FormData): Observable<any> {
    const headers = new HttpHeaders(); 
    return this.http.post(this.API_URL + 'uploadetask', formData, { headers });
  }
  
  //Afficher tous les Tasks
 // http://localhost:9090/emails?page=0&size=20
  getAllTasks(page: number): Observable<any> {
    const apiUrl = `${this.API_URL}page=${page}&size=${this.pageSize}`;
    return this.http.get(apiUrl, this.httpOptions);
  }

 //Ajouter une Task
  addTask(Task: any): Observable<any> {
    return this.http.post(this.API_URL + 'add', Task, httpOptions);
  }

  //supprimer une Task
  deleteTask(id: number): Observable<any> {
    const url = `${this.API_URL}delete/${id}`; // Include ID in the URL path
    return this.http.delete(url, httpOptions);
  }

}
