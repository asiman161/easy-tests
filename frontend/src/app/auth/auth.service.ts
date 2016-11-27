import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Angular2TokenService } from '../shared/api-factory/angular2-token.service';

@Injectable()
export class AuthService implements CanActivate {

  constructor(private router: Router,
              private _tokenService: Angular2TokenService) {
  }

  canActivate() {
    if (this._tokenService.userSignedIn()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
