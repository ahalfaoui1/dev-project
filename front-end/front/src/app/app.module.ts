import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { ContactComponent } from './contact/contact.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';

import { ContactdetailsComponent } from './contactdetails/contactdetails.component';
import { EntreprisedetailsComponent } from './entreprisedetails/entreprisedetails.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';

import { UsersComponent } from './users/users.component';
import { NotesComponent } from './notes/notes.component'; 
import { TasksComponent } from './tasks/tasks.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { EmailsComponent } from './emails/emails.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CheckemailComponent } from './checkemail/checkemail.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OverviewComponent } from './overview/overview.component';
import { ActivityComponent } from './activity/activity.component';
import { ActiviteComponent } from './activite/activite.component';
import { SettingsComponent } from './settings/settings.component';
import { ProspectionsComponent } from './prospections/prospections.component';
import { ProduitsComponent } from './produits/produits.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RecapComponent } from './prospections/recap/recap.component';
import { LeadsComponent } from './prospections/leads/leads.component';
import { FluxComponent } from './prospections/flux/flux.component';
import { PlanfierComponent } from './prospections/planfier/planfier.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [  
    AppComponent,  
    DashboardComponent, 
    HomeComponent, 
    HeaderComponent,  
    FooterComponent,   
    LoginComponent,  
    RegisterComponent, 
    ProfileComponent, 
    BoardAdminComponent, 
    BoardModeratorComponent, 
    BoardUserComponent,       
    UserdetailsComponent,   
    UsersComponent, 
    NotesComponent,    
    TasksComponent,      
    MeetingsComponent,
    EmailsComponent,  
    ResetPasswordComponent,   
    CheckemailComponent, 
    EntrepriseComponent, 
    EntreprisedetailsComponent,      
    ContactComponent,  
    ContactdetailsComponent,            
    ChangePasswordComponent, 
    OverviewComponent, 
    ActivityComponent,    
    ActiviteComponent, SettingsComponent, ProspectionsComponent, ProduitsComponent, TransactionsComponent, RecapComponent, LeadsComponent, FluxComponent, PlanfierComponent ,

    
  ],     
  imports: [   
    BrowserModule, 
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    DragDropModule, // Import the DragDropModule here
    FullCalendarModule,
     CommonModule,
     BrowserModule,
     BrowserAnimationsModule,
     MatTabsModule, 
     MatCardModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    
    
    DropdownModule
 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [httpInterceptorProviders, provideAnimationsAsync(),DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
