import { Injectable } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Injectable()
export class TestsListService {
  constructor(private _token: Angular2TokenService) {

  }

  getTests() {
    return this._token.get('teacher-tests');
  }

  changeTestVisibility(id: number, visibility: boolean) {
    return this._token.patch(`test-visibility/${id}`, {show_test: visibility});
  }

  deleteTest(id: number) {
    return this._token.delete(`tests/${id}`);
  }
}
