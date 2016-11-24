import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

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

  signIn() {
    this._tokenService.signIn(
      'example@example.org',
      'secretPassword'
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
