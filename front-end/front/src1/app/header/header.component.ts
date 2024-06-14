import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from '../_services/storage.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { EventBusService } from '../_shared/event-bus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  roles: { id: any; name: string } = { id: null, name: '' };
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username?: string;
  content?: string;

  private eventBusSub?: Subscription;


  // ...
  
 
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private userService: UserService,
    private eventBusService: EventBusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      switch (this.roles.name) {
        case 'ADMIN':
          this.showAdminBoard = true;
          break;
        case 'MODERATOR':
          this.showModeratorBoard = true;
          break;
        default:
          this.showUserBoard = true;
          break;
      }

      this.username = user.username;
    }

    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });

    this.eventBusSub = this.eventBusService.on('login', () => {
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) {
      this.eventBusSub.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log('Logout successful:', res);
        this.storageService.clean();
       this.router.navigate(['/login']); // Redirect to the login route
      },
      error: err => {
        console.error('Logout error:', err);
      }
    });
  }
  
}
