import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr';
import * as _ from 'lodash';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { UserData } from '../../shared/api-factory/angular2-token.model';
import { SidebarEventsService } from '../../sidebar/sidebar-events.service';
import { GroupListService } from './group-list.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  providers: [GroupListService]
})

export class GroupListComponent implements OnInit {

  public user: UserData = <UserData>{};
  public teachers: any[];
  public editingGroup = false;
  public addingTeacher = false;
  public groupInfo: any = {};
  public elderName: any = '';
  public insertGroup: FormGroup;
  public groupForm: FormGroup;
  public newTeacher: FormGroup;

  constructor(private _token: Angular2TokenService,
              private _fb: FormBuilder,
              private _toastr: ToastsManager,
              private _sidebarEventsService: SidebarEventsService,
  private _groupListService: GroupListService) {
  }


  ngOnInit() {
    if (this._token.currentUserData) {
      this.user = this._token.currentUserData;
      this.getTeachersAndGroup();
    } else {
      this._token.validateToken().subscribe(() => {
        this.user = this._token.currentUserData;
        this.getTeachersAndGroup();
      });
    }

    this.insertGroup = this._fb.group({
      group_key: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.newTeacher = this._fb.group({
      key: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  groupNewInfo() {
    this.editingGroup = true;
    this.groupForm = this._fb.group({
      // TODO: получить значения группы с сервера, сделать инициализацию формы и изменение группы по нажатию кнопки
      group_name: [this.groupInfo.group_name, [Validators.required, Validators.minLength(2)]],
      group_age: this.groupInfo.group_age,
      reset_key: false
    });
  }

  updateGroup(form) {
    if (form.valid) {
      this._groupListService.updateGroup(form.value).subscribe(() => {
        this.editingGroup = false;
        this._toastr.success('Группа успешно обновлена', 'Успешно!');
        this.groupInfo.group_name = form.value.group_name;
        this.groupInfo.group_age = form.value.group_age;
      }, error => {
        this._toastr.error('Что-то пошло не так', 'Ошибка!');
      });
    } else {
      this._toastr.error('В форме присутствуют ошибки', 'Ошибка!');
    }
  }

  addTeacher(form) {
    if (form.valid) {
      this._groupListService.addTeacher(form.value).subscribe(() => {
        this._toastr.success('Новый преподаватель добавлен', 'Успешно!');
        this.addingTeacher = false;
        this._sidebarEventsService.sidebarUpdate.emit({target: 'update'});
      }, error => {
        if (error.status === 404) {
          this._toastr.error('Преподаватель не найден', 'Ошибка!');
        } else {
          this._toastr.error('Что-то пошло не так', 'Ошибка!');
        }
      });
    }
  }

  getTeachersAndGroup() {
    this._groupListService.getTeachers().subscribe((res: any) => {
      this.teachers = JSON.parse(res._body).data;
    });
    this._groupListService.getGroup().subscribe((res: any) => {
      this.groupInfo = JSON.parse(res._body).data;
      if (this.user.role === 1) {
        let elder: any = _.find(this.groupInfo.students, {role: 2});
        this.elderName = `${elder.last_name} ${elder.first_name} ${elder.patronymic}`;
      }
    });
  }

  deleteTeacher(id, index) {
    this._groupListService.deleteTeacher(id).subscribe(() => {
      this._toastr.success('Преподаватель успешно удален', 'Успешно!');
      this._sidebarEventsService.sidebarUpdate.emit({target: 'update'});
      this.teachers.splice(index, 1);
    }, error => {
      this._toastr.error('Что-то пошло не так', 'Ошибка!');
    });
  }

  deleteStudent(id, index) {
    this._groupListService.deleteStudent(id).subscribe(() => {
      this._toastr.success('Студент успешно удален', 'Успешно!');
      this.groupInfo.students.splice(index, 1);
    }, error => {
      this._toastr.error('Что-то пошло не так', 'Ошибка!');
    });
  }
}
