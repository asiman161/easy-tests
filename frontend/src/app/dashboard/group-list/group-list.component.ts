import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { UserData } from '../../shared/api-factory/angular2-token.model';

@Component({
  selector: 'et-group-list',
  templateUrl: './group-list.component.html'
})

export class GroupListComponent implements OnInit {

  public user: UserData = <UserData>{};
  public teachers: UserData[] ;
  public createGroup: FormGroup;
  public insertGroup: FormGroup;
  public groupNewInfo: FormGroup;
  public newTeacher: FormGroup;

  constructor(private _token: Angular2TokenService,
              private _fb: FormBuilder) {}


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

    this.createGroup = this._fb.group({
      group_name: ['', [Validators.required, Validators.minLength(2)]],
      group_age: ''
    });

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

      });
    }
  }

  save(form){
    if (form.valid) {
      this._token.post('new-group', form.value).subscribe(res => {

      });
    }
  }

  addTeacher(form){
    if (form.valid) {
      this._token.post('add-teacher', form.value).subscribe(res => {

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
    });
  }
}
