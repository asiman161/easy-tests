import { Component, OnInit } from '@angular/core';

import {SelectModule} from 'ng2-select';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { UserData } from '../../shared/api-factory/angular2-token.model';

@Component({
  selector: 'et-groups-list',
  templateUrl: './groups-list.component.html'
})

export class GroupsListComponent implements OnInit {

  public user: UserData = <UserData>{};
  public groups: any = [];
  public subjects: any;

  constructor(private _token: Angular2TokenService) {}


  ngOnInit() {
    if (this._token.currentUserData) {
      this.user = this._token.currentUserData;
      this.getGroups();
    } else {
      this._token.validateToken().subscribe(() => {
        this.user = this._token.currentUserData;
        this.getGroups();
      });
    }
    this._token.get('subjects').subscribe((res:any) => {
      this.subjects = JSON.parse(res._body).data.map(item => {
        return {text: item.subject_name, id: item.id};
      });
    });
  }

  getGroups(){
    this._token.get('groups').subscribe((res:any) => {
      this.groups = JSON.parse(res._body).data.map(item => {
        item.subjects = item.subjects.map(subject => {
          return {text: subject.subject_name, id: subject.id};
        });
        return item;
      });
    });
  }

  deleteGroup(id){
    this._token.delete(`/groups/${id}`).subscribe((res: any) => {
      this.groups = JSON.parse(res._body).data.map(item => {
        item.subjects = item.subjects.map(subject => {
          return {text: subject.subject_name, id: subject.id};
        });
        return item;
      });
    });
  }

  addSubjectToGroup(subject, groupId) {
    this._token.patch(`/groups/${groupId}`, {subject_id: subject.id}).subscribe(res => {

    });
  }

  removeSubjectFromGroup(subject, groupId){
    this._token.post(`group_subjects/${groupId}`, {subject_id: subject.id}).subscribe(res => {

    });
  }

}
