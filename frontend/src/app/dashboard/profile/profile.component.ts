import { Component, OnInit } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { UserData } from '../../shared/api-factory/angular2-token.model';

@Component({
  selector: 'et-profile',
  templateUrl: 'profile.component.html',
})

export class ProfileComponent implements OnInit {
  public user: UserData = <UserData>{};
  public key: string;

  constructor(private _token: Angular2TokenService) {
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

  getKey() {
    if (this.user.role === 2 || this.user.role === 3) {
      this._token.get('get-key').subscribe((res: any) => {
        this.key = JSON.parse(res._body).key;
      });
    }
  }

  resetKey(){
    this._token.get('reset-key').subscribe((res: any) => {
      this.key = JSON.parse(res._body).key;
    });
  }

  test(){
    this._token.get('user-tests').subscribe((res: any) => {
      let tests: any = JSON.parse(res._body).data;
      console.log(tests);
    });
  };

}
