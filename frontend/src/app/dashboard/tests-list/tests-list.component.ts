import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import {Angular2TokenService} from '../../shared/api-factory/angular2-token.service';

@Component({
  selector: 'et-dashboard',
  templateUrl: './tests-list.component.html'
})
export class TestsListComponent implements OnInit{
  public testsList;
  constructor(private _token: Angular2TokenService, private http: Http) {
  }

  ngOnInit(){
    this.getTests();
    console.log(1);
  }

  getTests(){
    this._token.get('user-tests')
      .subscribe(res => {
        let tests:any = res;
        this.testsList = JSON.parse(tests._body).user_tests;


      })

    /*this.http.get('api/user-tests')
      .subscribe(res => {
        console.log(res);});*/
      //.unsubscribe();
  }

}

