import { Injectable } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Injectable()
export class CheckTestService {
  constructor(private _token: Angular2TokenService) {

  }

  saveRate(testId: number, userId: number, rate: any) {
    return this._token.patch(`test-rate/${testId}/${userId}`, {rate: rate});
  }
}
