import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Component({
  selector: 'et-test-show',
  templateUrl: './test-show.component.html'
})
export class TestShowComponent implements OnInit {
  public testData:any = {};

  constructor(private _token: Angular2TokenService,
              private _routeActivated: ActivatedRoute) {
  }

  ngOnInit(){
    this._routeActivated.params.subscribe((res: any) => {
      this._token.get(`tests/result/${res.id}`).subscribe((res: any) => {
        this.testData = JSON.parse(res._body).data;
      });
    });

  }
}

