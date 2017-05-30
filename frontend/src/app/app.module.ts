import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { SelectModule } from 'ng2-select';
import { ToastModule } from 'ng2-toastr';

import { Angular2TokenService } from './shared/api-factory/angular2-token.service';
import { SidebarEventsService } from './sidebar/sidebar-events.service';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { CreateTestComponent } from './dashboard/create-test/create-test.component';
import { VariantComponent } from './dashboard/create-test/variant/variant.component';
import { QuestionComponent } from './dashboard/create-test/variant/question/question.component';
import { AnswerComponent } from './dashboard/create-test/variant/question/answers/answer.component';
import { TestsListComponent } from './dashboard/tests-list/tests-list.component';
import { TestDoComponent } from './dashboard/test-do/test-do.component';
import { TestShowComponent } from './dashboard/test-show/test-show.component';
import { GroupListComponent } from './dashboard/group-list/group-list.component';
import { GroupsListComponent } from './dashboard/groups-list/groups-list.component';
import { SubjectsListComponent } from './dashboard/subjects-list/subjects-list.component';
import { CheckTestComponent } from './dashboard/check-test/check-test.component';
import { FeedbackComponent } from './dashboard/feedback/feedback.component';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

import { AuthService } from './auth/auth.service';
import { routing } from './app.routing';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    SelectModule,
    ToastModule.forRoot()
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
    TestsListComponent,
    TestDoComponent,
    TestShowComponent,
    GroupListComponent,
    GroupsListComponent,
    SubjectsListComponent,
    CheckTestComponent,
    FeedbackComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent
  ],
  providers: [
    AuthService,
    Angular2TokenService,
    SidebarEventsService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
