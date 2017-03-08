import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { Angular2TokenService } from './shared/api-factory/angular2-token.service';
import { NgUploaderModule } from 'ngx-uploader';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { CreateTestComponent } from './dashboard/create-test/create-test.component';
import { VariantComponent } from './dashboard/create-test/variant/variant.component';
import { QuestionComponent } from './dashboard/create-test/variant/question/question.component';
import { AnswerComponent } from './dashboard/create-test/variant/question/answers/answer.component';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

import { InputTextComponent } from './shared/elements/input-text/input-text.component';
import { TextAreaComponent } from './shared/elements/text-area/text-area.component';
import { AuthService } from './auth/auth.service';
import { SidebarListPipe } from './sidebar/sidebar-list.pipe';
import { routing } from './app.routing';


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
    VariantComponent,
    QuestionComponent,
    AnswerComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    InputTextComponent,
    TextAreaComponent,
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
