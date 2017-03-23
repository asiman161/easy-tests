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
  public createGroup: FormGroup;
  public insertGroup: FormGroup;
  public groupNewInfo: FormGroup;

  constructor(private _token: Angular2TokenService,
              private _fb: FormBuilder) {}


  ngOnInit() {
    if (this._token.currentUserData) {
      this.user = this._token.currentUserData;
    } else {
      this._token.validateToken().subscribe(() => {
        this.user = this._token.currentUserData;
      });
    }

    this.createGroup = this._fb.group({
      group_name: ['', [Validators.required, Validators.minLength(2)]],
      group_age: ''
    });

    this.insertGroup = this._fb.group({
      group_key: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.groupNewInfo = this._fb.group({
      //TODO: получить значения группы с сервера, сделать инициализацию формы и изменение группы по нажатию кнопки
      group_name: ['', [Validators.required, Validators.minLength(2)]],
      group_age: '',
      reset_key: false
    });
  }

  updateGroup(form){
    if (form.valid) {
      this._token.post('update-group', form.value).subscribe(res => {

      });
    }
  }

  save(form){
    if (form.valid) {
      this._token.post('new-group', form.value).subscribe(res => {

      });
    }
  }
}

