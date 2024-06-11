import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ContactdetailsComponent } from './contactdetails/contactdetails.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';

import { EntreprisedetailsComponent } from './entreprisedetails/entreprisedetails.component';

import { UsersComponent } from './users/users.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CheckemailComponent } from './checkemail/checkemail.component';

import { UserdetailsComponent } from './userdetails/userdetails.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsComponent } from './settings/settings.component';
import { ProduitsComponent } from './produits/produits.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ProspectionsComponent } from './prospections/prospections.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' }, // Assuming LoginComponent is the correct login component
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'checkemail', component: CheckemailComponent },
  { 
    path: '', 
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      //{ path: 'change-password', component: ChangePasswordComponent },
      //{ path: 'settings', component: SettingsComponent },
      { path: 'admin', component: BoardAdminComponent },
      { path: 'produits', component: ProduitsComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'prospections', component: ProspectionsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'user/details/:id', component: UserdetailsComponent },
      { path: 'entreprises', component: EntrepriseComponent },
      { path: 'entreprise/details/:id', component: EntreprisedetailsComponent },
      { path: 'contacts', component: ContactComponent },
      { path: 'contact/details/:id', component: ContactdetailsComponent },
      { path: 'header', component: HeaderComponent },
      { path: 'footer', component: FooterComponent },
      { path: 'user', component: BoardUserComponent },
      { path: 'mod', component: BoardModeratorComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' } // Redirect to 'home' by default within children
    ]
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
