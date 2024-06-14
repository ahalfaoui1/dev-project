import { Component } from '@angular/core';
import {  OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent {
  selectedComponent: string | null = 'notes';
  showComponent(component: string): void {
    this.selectedComponent = component;
  }  
  private route = inject(ActivatedRoute);
   user:any;
   image: string ='';
   formData = {
    id:Number(this.route.snapshot.paramMap.get('id')),
    imageDecode: '',
  };
   constructor(private userService: UserService, private router: Router) {}
   
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
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
