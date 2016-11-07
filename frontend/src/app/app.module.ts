import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {HttpModule} from '@angular/http';

import { Angular2TokenService } from 'angular2-token';

import {AppComponent} from './app.component';
import { DashboardComponent } from './dashboard/index';
import { AuthComponent } from './auth/index';
import {routing} from './app.routing';
import {AuthService} from './auth/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthService,
    Angular2TokenService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
