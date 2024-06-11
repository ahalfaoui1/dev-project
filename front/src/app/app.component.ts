
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service'; // Adjust the path as needed
import { StorageService } from './_services/storage.service';
import { Subscription } from 'rxjs';

import { EventBusService } from './_shared/event-bus.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  eventBusSub?: Subscription;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {}
  ngOnInit(): void {
    // Check if the user is not logged in
    if (!this.storageService.isLoggedIn()) {
       this.isLoggedIn = true;
      this.router.navigateByUrl('/login');
    } else {
     
    }
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
