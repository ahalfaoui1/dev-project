import { Component, OnInit ,inject} from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';


import { ActivatedRoute } from '@angular/router';







@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);


  selectedComponent: string | null = 'change-password';
  showComponent(component: string): void {
    this.selectedComponent = component;
  }  


  currentUser: any;
  user:any;
  id:any;
   image: string ='';
   
   formData = {
    id:0,
    imageDecode: '',
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


  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      reader.onload = () => {
        this.image = reader.result as string;
        const base64String = reader.result as string;
        this.formData.imageDecode = base64String.split(',')[1]; 
        this.changeimageUser();
     
           };
      reader.readAsDataURL(file);
    
    }
  }

  changeimageUser(): void {
   
    console.log('photo this.formData successfully:', this.formData);

    this.userService.changeimageUser(this.formData).subscribe({
      next: response => {
        this. getUser(this.formData.id);
        console.log('changephoto successfully:', response);
      },
      error: err => {
        console.log('change photo successfully:', err);
      }
    });
  }
}
