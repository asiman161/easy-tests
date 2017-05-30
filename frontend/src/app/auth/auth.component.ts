import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Angular2TokenService } from '../shared/api-factory/angular2-token.service';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})

export class AuthComponent implements OnInit {
  public isSigning = true;

  constructor(private _router: Router,
              private _tokenService: Angular2TokenService) {
  }

  ngOnInit() {
    this.isSigning = this._router.url === '/auth/sign-in';
  }

  changeStatus(status) {
    if (status !== this.isSigning) {
      this.isSigning = !this.isSigning;
    }
  }

  signIn(role: number) {
    let user: any;
    switch (role) {
      case 0 :
        user = {email: 'guest@gst.gst', password: 'guest111'};
        break;
      case 1 :
        user = {email: 'student@st.st', password: 'student1'};
        break;
      case 2 :
        user = {email: 'elder@el.el', password: 'elder123'};
        break;
      case 3:
        user = {email: 'teacher@th.th', password: 'teacher1'};
        break;
    }
    this._tokenService.signIn(
      user.email,
      user.password
    ).subscribe(
      res => {
        this._router.navigate(['']);
      },
      error => console.error(error)
    );
  }

}
