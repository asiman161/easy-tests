import { Routes, RouterModule }   from '@angular/router';

import { Angular2TokenService } from './shared/api-factory/angular2-token.service';

import { DashboardComponent } from './dashboard/index';
import { AuthComponent } from './auth/index';
import { AuthService } from './auth/auth.service';
import { SignInComponent } from './auth/sign-in/index';
import { SignUpComponent } from './auth/sign-up/index';
import {ProfileComponent} from './dashboard/profile/profile.component';



//noinspection TypeScriptValidateTypes
const appRoutes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [Angular2TokenService],
    children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      { path: 'profile', component: ProfileComponent, canActivate: [Angular2TokenService] }
    ]
  },

  {
    path: 'auth', component: AuthComponent,
    children: [
      {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
      {path: 'sign-in', component: SignInComponent , canActivate: [AuthService]},
      {path: 'sign-up', component: SignUpComponent , canActivate: [AuthService]}
    ]
  }
];

export const routing = RouterModule.forRoot(appRoutes);

