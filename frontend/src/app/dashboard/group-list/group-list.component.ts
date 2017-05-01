import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr';
import * as _ from 'lodash';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { UserData } from '../../shared/api-factory/angular2-token.model';
import { SidebarEventsService } from '../../sidebar/sidebar-events.service';

@Component({
  selector: 'et-group-list',
  templateUrl: './group-list.component.html'
})

export class GroupListComponent implements OnInit {

  public user: UserData = <UserData>{};
  public teachers: any[];
  public editingGroup: boolean = false;
  public addingTeacher: boolean = false;
  public groupInfo: any = {};
  public elderName: any = '';
  public insertGroup: FormGroup;
  public groupForm: FormGroup;
  public newTeacher: FormGroup;

  constructor(private _token: Angular2TokenService,
              private _fb: FormBuilder,
              private _toastr: ToastsManager,
              private _sidebarEventsService: SidebarEventsService) {}


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

  groupNewInfo(){
    this.editingGroup = true;
    this.groupForm = this._fb.group({
      // TODO: получить значения группы с сервера, сделать инициализацию формы и изменение группы по нажатию кнопки
      group_name: [this.groupInfo.group_name, [Validators.required, Validators.minLength(2)]],
      group_age: this.groupInfo.group_age,
      reset_key: false
    });
  }

  updateGroup(form){
    if (form.valid) {
      this._token.patch('update-group', form.value).subscribe(res => {
        this.editingGroup = false;
        this._toastr.success('Группа успешно обновлена', 'Успешно!');
      }, error => {
        this._toastr.error('Что-то пошло не так', 'Ошибка!');
      });
    }
  }

  addTeacher(form){
    if (form.valid) {
      this._token.post('add-teacher', form.value).subscribe(res => {
        this._toastr.success('Новый преподаватель добавлен', 'Успешно!');
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

  getTeachersAndGroup(){
    this._token.get('group').subscribe((res:any) => {
      this.groupInfo = JSON.parse(res._body).data;
      if (this.user.role === 1) {
        let elder: any = _.find(this.groupInfo.students, {role: 2});
        this.elderName = `${elder.last_name} ${elder.first_name} ${elder.patronymic}`;
      }
    });
    this._token.get('teachers').subscribe((res:any) => {
      this.teachers = JSON.parse(res._body).data;
    });
  }

  deleteTeacher(id, index){
    this._token.delete(`teachers/${id}`).subscribe((res:any) => {
      this._toastr.success('Преподаватель успешно удален', 'Успешно!');
      this._sidebarEventsService.sidebarUpdate.emit({target: 'update'});
      this.teachers.splice(index, 1);
    }, error => {
      this._toastr.error('Что-то пошло не так', 'Ошибка!');
    });
  }

  deleteStudent(id, index){
    this._token.delete(`students/${id}`).subscribe((res:any) => {
      this._toastr.success('Студент успешно удален', 'Успешно!');
      this.groupInfo.students.splice(index, 1);
    }, error => {
      this._toastr.error('Что-то пошло не так', 'Ошибка!');
    });
  }
}
