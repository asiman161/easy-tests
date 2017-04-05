import { Component, OnInit } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { UserData } from '../../shared/api-factory/angular2-token.model';

@Component({
  selector: 'et-subjects-list',
  templateUrl: 'subjects-list.component.html',
})

export class SubjectsListComponent implements OnInit {
  public subjects = [];
  constructor(private _token: Angular2TokenService) {
  }

  ngOnInit() {
    this._token.get('subjects').subscribe((res:any) => {
      this.subjects = JSON.parse(res._body).data;
    });
  }

  deleteSubject(id){
    this._token.delete(`subjects/${id}`).subscribe((res:any) => {
      this.subjects = JSON.parse(res._body).data;
    });
  }
}
