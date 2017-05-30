import { Component, OnInit } from '@angular/core';

import { ToastsManager } from 'ng2-toastr';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { UserData } from '../../shared/api-factory/angular2-token.model';
import { SidebarEventsService } from '../../sidebar/sidebar-events.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html'
})

export class GroupsListComponent implements OnInit {

  public user: UserData = <UserData>{};
  public groups: any = [];
  public subjects: any;

  constructor(private _token: Angular2TokenService,
              private _toastr: ToastsManager,
              private _sidebarEventsService: SidebarEventsService) {
  }


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
    this._token.get('subjects').subscribe((res: any) => {
      this.subjects = JSON.parse(res._body).data.map(item => {
        return {text: item.subject_name, id: item.id};
      });
    });
  }

  getGroups() {
    this._token.get('groups').subscribe((res: any) => {
      this.groups = JSON.parse(res._body).data.map(item => {
        item.subjects = item.subjects.map(subject => {
          return {text: subject.subject_name, id: subject.id};
        });
        return item;
      });
    });
  }

  deleteGroup(id) {
    this._token.delete(`/groups/${id}`).subscribe((res: any) => {
      this._toastr.success('Группа успешно удалена', 'Успешно!');
      this._sidebarEventsService.sidebarUpdate.emit({target: 'update'});
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
      this._sidebarEventsService.sidebarUpdate.emit({target: 'update'});
    });
  }

  removeSubjectFromGroup(subject, groupId, groupName) {
    this._token.delete(`group_subjects/${groupId}/${subject.id}`).subscribe(res => {
      this._toastr.success(`Предмет успешно удален из группы ${groupName}`, 'Успешно!');
      this._sidebarEventsService.sidebarUpdate.emit({target: 'update'});
    });
  }

}
