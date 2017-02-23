import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { Angular2TokenService } from './shared/api-factory/angular2-token.service';
import { NgUploaderModule } from 'ngx-uploader';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/index';
import { SidebarComponent } from './sidebar/index';
import { DashboardComponent } from './dashboard/index';
import { ProfileComponent } from './dashboard/profile/index';
import { CreateTestComponent } from './dashboard/create-test/index';
import { AuthComponent } from './auth/index';
import { SignInComponent } from './auth/sign-in/index';
import { SignUpComponent } from './auth/sign-up/index';
import { routing } from './app.routing';
import { AuthService } from './auth/auth.service';
import { SidebarListPipe } from './sidebar/sidebar-list.pipe';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    NgUploaderModule
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    ProfileComponent,
    CreateTestComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    SidebarListPipe
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
