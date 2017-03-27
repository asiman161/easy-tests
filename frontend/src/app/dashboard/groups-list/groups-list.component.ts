import { Component, OnInit } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { UserData } from '../../shared/api-factory/angular2-token.model';

@Component({
  selector: 'et-groups-list',
  templateUrl: './groups-list.component.html'
})

export class GroupsListComponent implements OnInit {

  public user: UserData = <UserData>{};
  public groups: any = [];

  constructor(private _token: Angular2TokenService) {}


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
  }

  getGroups(){
    this._token.get('get-groups').subscribe((res:any) => {
      this.groups = JSON.parse(res._body);
    });
  }

  deleteGroup(id){
    this._token.delete(`/groups/${id}`).subscribe();
  }

}
