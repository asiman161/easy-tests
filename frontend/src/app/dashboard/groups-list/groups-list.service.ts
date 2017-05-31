import { Injectable } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Injectable()
export class GroupsListService {
  constructor(private _token: Angular2TokenService) {

  }

  getSubjects() {
    return this._token.get('subjects');
  }

  getGroups() {
    return this._token.get('groups');
  }

  deleteGroup(id) {
    return this._token.delete(`/groups/${id}`);
  }

  addSubjectToGroup(groupId, subjectId) {
    return this._token.patch(`/groups/${groupId}`, {subject_id: subjectId});
  }

  removeSubjectFromGroup(groupId, subjectId) {
    return this._token.delete(`group_subjects/${groupId}/${subjectId}`);
  }
}
