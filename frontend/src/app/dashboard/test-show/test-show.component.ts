import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TestShowService } from './test-show.service';

@Component({
  selector: 'app-test-show',
  templateUrl: './test-show.component.html',
  providers: [TestShowService]
})
export class TestShowComponent implements OnInit {
  public testData: any = {};

  constructor(private _routeActivated: ActivatedRoute,
              private _testShowService: TestShowService) {
  }

  ngOnInit() {
    this._routeActivated.params.subscribe((res: any) => {
      this._testShowService.getTestResult(res.id).subscribe((res: any) => {
        this.testData = JSON.parse(res._body).data;
      });
    });

  }
}

