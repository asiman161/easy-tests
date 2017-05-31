import { Injectable } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Injectable()
export class TestDoService {
  constructor(private _token: Angular2TokenService) {

  }

  getVariantMode(id) {
    return this._token.get(`check_test_variants_mode/${id}`);
  }

  getTest(id, variantSelected) {
    return this._token.post(`user-test/${id}`, {variant_number: parseInt(variantSelected)});
  }

  completeTest(id, data) {
    return this._token.post(`user-test/complete/${id}`, data);
  }
}
