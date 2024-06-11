
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  showPassword: boolean = false;

  form: any = {
    email: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: { id: any; name: string } = { id: null, name: '' };

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    const { email } = this.form;

    this.authService.resetpassword(email).subscribe({
      next: data => {
        this.authService.resetpassword(data);
      
        this.roles = this.storageService.getUser().roles.name;
        this.router.navigateByUrl('/checkemail');
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.router.navigateByUrl('/login');
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
