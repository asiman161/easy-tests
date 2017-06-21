import { Injectable } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Injectable()
export class SubjectsListService {
  constructor(private _token: Angular2TokenService) {

  }

  getSubjects() {
    return this._token.get('subjects');
  }

  saveSubject(data) {
    return this._token.post('subjects', {subject_name: data});
  }

  deleteSubject(id) {
    return this._token.delete(`subjects/${id}`);
  }
}
