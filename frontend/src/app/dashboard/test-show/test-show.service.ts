import { Injectable } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Injectable()
export class TestShowService {
  constructor(private _token: Angular2TokenService) {

  }

  getTestResult(id) {
    return this._token.get(`tests/result/${id}`);
  }
}
