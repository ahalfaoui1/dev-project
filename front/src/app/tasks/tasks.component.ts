import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TaskService } from '../_services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  search: string = '';
  tasks: any =[];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 20;
  constructor(private modalService: BsModalService,private httpClient: HttpClient,private taskService: TaskService, private router: Router){}
  
  ngOnInit(){
    this.getAllTasks(this.currentPage);
  }
  getAllTasks(page: number ): void {
      // console.log(' fetching Note:', page);
      this.taskService.getAllTasks(page).subscribe({
        next: (response) => {
          this.tasks = response._embedded.tasks;
          this.totalPages = response.page.totalPages;
          console.log(' fetching task:', response._embedded.tasks);
        },
        error: (error) => {
          console.error('Error fetching task:', error);
   
        }
      });
  }
}
