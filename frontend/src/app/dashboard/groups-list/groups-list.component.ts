import { Component, OnInit } from '@angular/core';

import {SelectModule} from 'ng2-select';
import { ToastsManager } from 'ng2-toastr';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { UserData } from '../../shared/api-factory/angular2-token.model';
import { EventsService } from '../../shared/events.service';

@Component({
  selector: 'et-groups-list',
  templateUrl: './groups-list.component.html'
})

export class GroupsListComponent implements OnInit {

  public user: UserData = <UserData>{};
  public groups: any = [];
  public subjects: any;

  constructor(private _token: Angular2TokenService,
              private _toastr: ToastsManager,
              private _eventsService: EventsService) {}


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
      this._toastr.success('Группа успешно удалена', 'Успешно!');
      this._eventsService.sidebarUpdate.emit('update');
      this.groups = JSON.parse(res._body).data.map(item => {
        item.subjects = item.subjects.map(subject => {
          return {text: subject.subject_name, id: subject.id};
        });
        return item;
      });
    }, error => {
      this._toastr.success('Что-то пошло не так', 'Ошибка!');
    });
  }

  addSubjectToGroup(subject, groupId, groupName) {
    this._token.patch(`/groups/${groupId}`, {subject_id: subject.id}).subscribe(res => {
      this._toastr.success(`Предмет успешно добавлен в группу ${groupName}`, 'Успешно!');
      this._eventsService.sidebarUpdate.emit('update');
    });
  }

  removeSubjectFromGroup(subject, groupId, groupName){
    this._token.post(`group_subjects/${groupId}`, {subject_id: subject.id}).subscribe(res => {
      this._toastr.success(`Предмет успешно удален из группы ${groupName}`, 'Успешно!');
      this._eventsService.sidebarUpdate.emit('update');
    });
  }

}
