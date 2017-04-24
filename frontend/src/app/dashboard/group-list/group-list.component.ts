import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { UserData } from '../../shared/api-factory/angular2-token.model';
import { SidebarEventsService } from '../../sidebar/sidebar-events.service';

@Component({
  selector: 'et-group-list',
  templateUrl: './group-list.component.html'
})

export class GroupListComponent implements OnInit {

  public user: UserData = <UserData>{};
  public teachers: UserData[] ;
  public insertGroup: FormGroup;
  public groupNewInfo: FormGroup;
  public newTeacher: FormGroup;

  constructor(private _token: Angular2TokenService,
              private _fb: FormBuilder,
              private _toastr: ToastsManager,
              private _sidebarEventsService: SidebarEventsService) {}


  ngOnInit() {
    if (this._token.currentUserData) {
      this.user = this._token.currentUserData;
      this.getTeachers();
    } else {
      this._token.validateToken().subscribe(() => {
        this.user = this._token.currentUserData;
        this.getTeachers();
      });
    }

    this.insertGroup = this._fb.group({
      group_key: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.groupNewInfo = this._fb.group({
      // TODO: получить значения группы с сервера, сделать инициализацию формы и изменение группы по нажатию кнопки
      group_name: ['', [Validators.required, Validators.minLength(2)]],
      group_age: '',
      reset_key: false
    });

    this.newTeacher = this._fb.group({
      key: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  updateGroup(form){
    if (form.valid) {
      this._token.patch('update-group', form.value).subscribe(res => {
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
        this._toastr.error('Что-то пошло не так', 'Ошибка!');
      });
    }
  }

  getTeachers(){
    this._token.get('teachers').subscribe((res:any) => {
      this.teachers = JSON.parse(res._body).data;
    });
  }

  deleteGroup(id){
    this._token.delete(`teachers/${id}`).subscribe((res:any) => {
      this._toastr.success('Преподаватель успешно удален', 'Успешно!');
      this._sidebarEventsService.sidebarUpdate.emit({target: 'update'});
    }, error => {
      this._toastr.error('Что-то пошло не так', 'Ошибка!');
    });
  }
}
