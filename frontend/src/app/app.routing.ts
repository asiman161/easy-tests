import { Routes, RouterModule }   from '@angular/router';

import { Angular2TokenService } from './shared/api-factory/angular2-token.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { CreateTestComponent } from './dashboard/create-test/create-test.component';
import { TestsListComponent } from './dashboard/tests-list/tests-list.component';


const appRoutes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [Angular2TokenService],
    children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'profile', component: ProfileComponent, canActivate: [Angular2TokenService]},
      {path: 'create-test', component: CreateTestComponent, canActivate: [Angular2TokenService]},
      {path: 'tests-list', component: TestsListComponent, canActivate: [Angular2TokenService]}
    ]
  },

  {
    path: 'auth', component: AuthComponent,
    children: [
      {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
      {path: 'sign-in', component: SignInComponent, canActivate: [AuthService]},
      {path: 'sign-up', component: SignUpComponent, canActivate: [AuthService]}
    ]
  }
];

export const routing = RouterModule.forRoot(appRoutes);

