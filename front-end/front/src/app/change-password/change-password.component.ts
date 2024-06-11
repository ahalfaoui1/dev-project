
import { Component, OnInit ,inject} from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  successMessage: string | null = null;
  errorMessage: string | null = null
  private route = inject(ActivatedRoute);
  currentUser: any;
  user:any;
  id:any;
  currentpassword:any;
  formData = {
    id:0,
    currentpassword: '',
    password: '',
    repassword: '',
    
  };
 
  constructor(private storageService: StorageService,private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.user=this.getUser(this.currentUser.id);
    this.formData.id =this.currentUser.id;
    const id = this.currentUser.id;
    if (id) {
       this.getUser(id);
      console.log(" this.user", this.user);
    }
  }
  getUser(id: number): void {
   
    this.userService.getUser(id).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error) => {
        console.error('Error get user:', error);
      }
    });
  }
 
  async verifierpassword(): Promise<boolean> {
    try {
      const response = await this.userService.verifierpassword(this.formData).toPromise();
     // console.log('Password response correct:', response);
      this.getUser(this.formData.id);
      return response; // Return the boolean value
    } catch (err) {
     // console.log('Password verification error:', err);
      return false; // Or handle error as needed
    }
  }
  

  
  verifFom(): boolean {
    return this.formData.password === this.formData.repassword;
  }
  
  async submitChangepasswordForm(): Promise<void> {
    const passwordVerified = await this.verifierpassword();
    const formVerified = this.verifFom();

    if (passwordVerified && formVerified) {
      this.userService.changePasswordUser(this.formData).subscribe({
        next: response => {
          this.getUser(this.formData.id);
          this.successMessage = 'Mot de passe changé avec succès';
          this.errorMessage = null;
        },
        error: err => {
          console.log('Password change error:', err);
          this.errorMessage = 'Erreur lors du changement de mot de passe';
          this.successMessage = null;
        }
      });
    } else {
      this.errorMessage = 'Veuillez vérifier vos informations';
      this.successMessage = null;
    }
  }
  
  
}
