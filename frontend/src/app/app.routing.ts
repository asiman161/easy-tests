import { Routes, RouterModule } from '@angular/router';

import { Angular2TokenService } from './shared/api-factory/angular2-token.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { FeedbackComponent } from './dashboard/feedback/feedback.component';
import { CreateTestComponent } from './dashboard/create-test/create-test.component';
import { TestsListComponent } from './dashboard/tests-list/tests-list.component';
import { TestDoComponent } from './dashboard/test-do/test-do.component';
import { TestShowComponent } from './dashboard/test-show/test-show.component';
import { GroupListComponent } from './dashboard/group-list/group-list.component';
import { GroupsListComponent } from './dashboard/groups-list/groups-list.component';
import { SubjectsListComponent } from './dashboard/subjects-list/subjects-list.component';
import { CheckTestComponent } from './dashboard/check-test/check-test.component';


const appRoutes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [Angular2TokenService],
    children: [
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: 'feedback', component: FeedbackComponent, canActivate: [Angular2TokenService]},
      {path: 'profile', component: ProfileComponent, canActivate: [Angular2TokenService]},
      {path: 'create-test', component: CreateTestComponent, canActivate: [Angular2TokenService]},
      {path: 'tests-list', component: TestsListComponent, canActivate: [Angular2TokenService]},
      {path: 'test/:id/do', component: TestDoComponent, canActivate: [Angular2TokenService]},
      {path: 'test/:id/show', component: TestShowComponent, canActivate: [Angular2TokenService]},
      {path: 'group-list', component: GroupListComponent, canActivate: [Angular2TokenService]},
      {path: 'groups-list', component: GroupsListComponent, canActivate: [Angular2TokenService]},
      {path: 'subjects-list', component: SubjectsListComponent, canActivate: [Angular2TokenService]},
      {path: 'check-test/:test_id/:user_id', component: CheckTestComponent, canActivate: [Angular2TokenService]}
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

