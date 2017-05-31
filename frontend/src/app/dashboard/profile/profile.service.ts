import { Injectable } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Injectable()
export class ProfileService {
  constructor(private _token: Angular2TokenService) {

  }

  saveProfile(data) {
    return this._token.patch('profiles', data);
  }

  getKey() {
    return this._token.get('get-key');
  }

  resetKey() {
    return this._token.get('reset-key');
  }
}
