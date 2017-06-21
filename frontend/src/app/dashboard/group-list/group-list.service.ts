import { Injectable } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Injectable()
export class GroupListService {
  constructor(private _token: Angular2TokenService) {

  }

  updateGroup(data) {
    return this._token.patch('update-group', data);
  }

  addTeacher(data) {
    return this._token.post('add-teacher', data);
  }

  getTeachers() {
    return this._token.get('teachers');
  }

  getGroup() {
    return this._token.get('group');
  }

  deleteTeacher(id) {
    return this._token.delete(`teachers/${id}`);
  }

  deleteStudent(id) {
    return this._token.delete(`students/${id}`);
  }
}
