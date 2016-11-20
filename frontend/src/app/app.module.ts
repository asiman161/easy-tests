import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { Angular2TokenService } from 'angular2-token';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/index';
import { SidebarComponent } from './shared/sidebar/index';
import { DashboardComponent } from './dashboard/index';
import { AuthComponent } from './auth/index';
import { SignInComponent } from './auth/sign-in/index';
import { SignUpComponent } from './auth/sign-up/index';
import { routing } from './app.routing';
import { AuthService } from './auth/auth.service';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent
  ],
  providers: [
    AuthService,
    Angular2TokenService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
