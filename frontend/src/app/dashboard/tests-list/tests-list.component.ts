import { Component, OnInit } from '@angular/core';

import {Angular2TokenService} from '../../shared/api-factory/angular2-token.service';

@Component({
  selector: 'et-dashboard',
  templateUrl: './tests-list.component.html'
})
export class TestsListComponent implements OnInit{
  public testsList;
  constructor(private _token: Angular2TokenService) {
  }

  ngOnInit(){
    this.getTests();
  }

  getTests(){
    this._token.get('user-tests')
      .subscribe(res => {
        let tests:any = res;
        this.testsList = JSON.parse(tests._body).data.tests;
        console.log(JSON.parse(tests._body));
      });
  }
}

