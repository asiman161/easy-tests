import { Routes, RouterModule }   from '@angular/router';
import { DashboardComponent } from './dashboard/index';
import { AuthComponent } from './auth/index';
import { AuthService } from './auth/auth.service';


const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  {path: 'auth', component: AuthComponent, canActivate: [AuthService]}
];

export const routing = RouterModule.forRoot(appRoutes);

