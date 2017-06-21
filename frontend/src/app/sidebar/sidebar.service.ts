import { Injectable } from '@angular/core';

import { Angular2TokenService } from '../shared/api-factory/angular2-token.service';

@Injectable()
export class SidebarService {
  constructor(private _token: Angular2TokenService) {

  }

  getUserTests() {
    return this._token.get('user-tests');
  }
}
