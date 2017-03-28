import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

import * as _ from 'lodash';


@Component({
  selector: 'et-test-do',
  templateUrl: './test-do.component.html'
})
export class TestDoComponent implements OnInit, OnDestroy {
  private _testId: number;
  private _routeParamsSub: any;
  private _userTestSub: any;
  private _user_answers: number[][] = [];
  public testData: any = {};
  public testTitle: any = '';


  constructor(private _router: Router,
              private _routeActivated: ActivatedRoute,
              private _token: Angular2TokenService) {
  }

  ngOnInit() {
    this._routeParamsSub = this._routeActivated.params.subscribe((res:any) => {
      this._testId = res.id;

      this._userTestSub = this._token.post(`/user-test/${this._testId}`, {variant_number: 0}).subscribe((res: any) => {
        let parsedData = JSON.parse(res._body);
        this.testTitle = parsedData.test_title;
        this.testData = parsedData.test_data;
        this.testData.questions.forEach((item, i) => {
          this._user_answers[i] = [];
        });

      });
    });
  }

  setAnswer(questionId, answerId) {
    if (_.includes(this._user_answers[questionId], answerId)) {
      this._user_answers[questionId].splice(this._user_answers[questionId].indexOf(answerId), 1);
    } else {
      this._user_answers[questionId].push(answerId);
    }
  }

  completeTest() {
    this._userTestSub = this._token.post('user-test/complete', {
      answers: this._user_answers,
      test_id: this._testId
    }).subscribe((res: any) => {
      this._router.navigateByUrl('');
    });
  }

  ngOnDestroy() {
    this._routeParamsSub.unsubscribe();
    this._userTestSub.unsubscribe();
  }
}

