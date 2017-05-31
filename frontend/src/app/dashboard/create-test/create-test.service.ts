import { Injectable } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Injectable()
export class CreateTestService {
  constructor(private _token: Angular2TokenService) {

  }

  save(data) {
    return this._token.post('create-test', data);
  }
}
