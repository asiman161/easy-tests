import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Angular2TokenService } from '../shared/api-factory/angular2-token.service';

import { AuthService } from './auth.service';

@Component({
  selector: 'et-auth',
  templateUrl: './auth.component.html',
  providers: [AuthService]
})

export class AuthComponent {
  constructor(private router: Router,
              private _tokenService: Angular2TokenService) {
  }

  register() {
    this._tokenService.registerAccount(
      'example@example.org',
      'secretPassword',
      'secretPassword'
    ).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['']);
      },
      error => console.log(error)
    );
  }

  signIn(role: number) {
    let user:any;
    switch (role){
      case 1 : 
        user = user = {email : 'student@st.st', password: 'student1'};
        break;
      case 2 :
        user = {email : 'elder@el.el', password: 'elder123'};
        break;
      case 3:
        user = {email : 'teacher@th.th', password: 'teacher1'};
        break;
    }
    this._tokenService.signIn(
      user.email,
      user.password
    ).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['']);
      },
      error => console.log(error)
    );
  }

  signOut() {
    this._tokenService.signOut().subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }

  validateToken() {
    this._tokenService.validateToken().subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }

  deleteAccount() {
    this._tokenService.deleteAccount().subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }


}
