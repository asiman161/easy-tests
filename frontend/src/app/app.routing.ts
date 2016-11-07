import { Routes, RouterModule }   from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

import { DashboardComponent } from './dashboard/index';
import { AuthComponent } from './auth/index';
import { AuthService } from './auth/auth.service';
import { SignInComponent } from './auth/sign-in/index';
import { SignUpComponent } from './auth/sign-up/index';



//noinspection TypeScriptValidateTypes
const appRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [Angular2TokenService] },
  {
    path: 'auth', component: AuthComponent,
    children: [
      {path: '', redirectTo: 'sign-in'},
      {path: 'sign-in', component: SignInComponent , canActivate: [AuthService]},
      {path: 'sign-up', component: SignUpComponent , canActivate: [AuthService]}
    ]
  }
];

export const routing = RouterModule.forRoot(appRoutes);

