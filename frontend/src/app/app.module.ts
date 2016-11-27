import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { Angular2TokenService } from './shared/api-factory/angular2-token.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/index';
import { SidebarComponent } from './sidebar/index';
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
    Angular2TokenService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
