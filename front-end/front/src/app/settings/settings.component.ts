


import { Component, OnInit ,inject} from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  
  private route = inject(ActivatedRoute);
  currentUser: any;
  user:any;
  id:any;
  currentpassword:any;
  formData = {
    id:0,
    hote:'',
    email:'',
    port:'',
    password: '',
    repassword: '',
  };
 
  constructor(private storageService: StorageService,private userService: UserService, private router: Router) {}
  ngOnInit(): void {
   
     
  }
 

  
 
  

  
}
