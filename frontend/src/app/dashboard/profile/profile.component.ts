import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastsManager } from 'ng2-toastr';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { ProfileRegexp, ProfileRegexps } from './profile-regexps.model';
import { SidebarEventsService } from '../../sidebar/sidebar-events.service';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  providers: [ProfileService]
})

export class ProfileComponent implements OnInit {
  public user: any = {};
  public key: string;
  public editingProfile = false;
  public profileForm: FormGroup;
  private regexps: ProfileRegexp = new ProfileRegexps().regexps;

  constructor(private _router: Router,
              private _token: Angular2TokenService,
              private _fb: FormBuilder,
              private _toastr: ToastsManager,
              private _sidebarEventsService: SidebarEventsService,
              private _profileService: ProfileService) {
  }

  ngOnInit() {
    if (this._token.currentUserData) {
      this.user = this._token.currentUserData;
      this.getKey();
    } else {
      this._token.validateToken().subscribe(() => {
        this.user = this._token.currentUserData;
        this.getKey();
      });
    }
  }

  setProfileForm(role = 1) {
    this.profileForm = this._fb.group({
      first_name: ['', [
        Validators.required,
        Validators.pattern(this.regexps.firstName)
      ]],
      last_name: ['', [
        Validators.required,
        Validators.pattern(this.regexps.lastName)
      ]],
      patronymic: ['', Validators.pattern(this.regexps.patronymic)],
      user_role: [role.toString(), Validators.required],
      group_key: ['', this.generateProfileValidators(role, true)],
      group_name: ['', this.generateProfileValidators(role, false)],
      group_age: ['', Validators.pattern(this.regexps.groupAge)]
    });
  }

  editProfile() {
    this.editingProfile = true;
    this.setProfileForm();
  }

  saveProfile() {
    if (this.profileForm.valid) {
      this._profileService.saveProfile(this.profileForm.value).subscribe((res: any) => {
        this._token.validateToken().subscribe(() => {
          let role = this._token.currentUserData.role;
          this._toastr.success('Ваш профиль успешно обновлен', 'Успешно!');
          this._sidebarEventsService.sidebarUpdate.emit({target: 'updateRole', data: {role: role}});
          this._router.navigateByUrl(role === 3 ? 'groups-list' : 'group-list');
        });
      }, error => {
        this._toastr.error('Что-то пошло не так', 'Ошибка!');
      });

    } else {
      this._toastr.error('Убедитесь, что все поля заполнены верно', 'Ошибка!');
    }
  }

  getKey() {
    if (this.user.role === 2 || this.user.role === 3) {
      this._profileService.getKey().subscribe((res: any) => {
        this.key = JSON.parse(res._body).key;
      });
    }
  }

  resetKey() {
    this._profileService.resetKey().subscribe((res: any) => {
      this._toastr.success('Вы сменили ключ доступа', 'Успешно!');
      this.key = JSON.parse(res._body).key;
    }, error => {
      this._toastr.error('Что-то пошло не так', 'Ошибка!');
    });
  }

  private generateProfileValidators(role: number, isKey: boolean): ValidatorFn[] {
    switch (role) {
      case 1:
        return isKey ? [Validators.required, Validators.pattern(this.regexps.groupKey)] : null;
      case 2:
        return !isKey ? [Validators.required, Validators.pattern(this.regexps.groupName)] : null;
      case 3:
        return null;
    }
  }
}
