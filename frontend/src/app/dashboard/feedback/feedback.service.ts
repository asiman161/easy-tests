import { Injectable } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Injectable()
export class FeedbackService {
  constructor(private _token: Angular2TokenService) {

  }

  leftFeedback(data: any) {
    return this._token.post('feedback', data);
  }
}
