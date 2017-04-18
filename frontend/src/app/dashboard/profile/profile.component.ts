import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { UserData } from '../../shared/api-factory/angular2-token.model';
import { ProfileRegexp, ProfileRegexps } from './profile-regexps.model';
import { EventsService } from '../../shared/events.service';

@Component({
  selector: 'et-profile',
  templateUrl: 'profile.component.html',
})

export class ProfileComponent implements OnInit {
  public user: UserData = <UserData>{};
  public key: string;
  public editingProfile: boolean = false;
  public profileForm: FormGroup;
  private regexps: ProfileRegexp = new ProfileRegexps().regexps;

  constructor(private _token: Angular2TokenService,
              private _fb: FormBuilder,
              private eventService: EventsService) {
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
      this._token.patch('profiles', this.profileForm.value).subscribe((res: any) => {
        this.eventService.sidebarUpdate.emit({role: JSON.parse(res._body).data.role});
      });

    } else {

    }
  }

  getKey() {
    if (this.user.role === 2 || this.user.role === 3) {
      this._token.get('get-key').subscribe((res: any) => {
        this.key = JSON.parse(res._body).key;
      });
    }
  }

  resetKey() {
    this._token.get('reset-key').subscribe((res: any) => {
      this.key = JSON.parse(res._body).key;
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
