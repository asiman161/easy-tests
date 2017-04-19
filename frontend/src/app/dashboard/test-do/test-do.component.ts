import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

import * as _ from 'lodash';


@Component({
  selector: 'et-test-do',
  templateUrl: './test-do.component.html'
})
export class TestDoComponent implements OnInit, OnDestroy {
  public testType: number;
  public testTitle: string = '';
  public testData: any = {};
  public workForm: FormGroup;
  private _testId: number;
  private _routeParamsSub: any;
  private _userTestSub: any;
  private _user_answers: number[][] = [];


  constructor(private _router: Router,
              private _routeActivated: ActivatedRoute,
              private _token: Angular2TokenService,
              private _fb: FormBuilder) {
  }

  ngOnInit() {
    this._routeParamsSub = this._routeActivated.params.subscribe((res: any) => {
      this._testId = res.id;

      this._userTestSub = this._token.post(`user-test/${this._testId}`, {variant_number: 0}).subscribe((res: any) => {
        let parsedData = JSON.parse(res._body);
        this.testType = parsedData.test_type;
        this.testTitle = parsedData.test_title;
        this.testData = parsedData.test_data;
        if (this.testType === 0) {
          this.workForm = this._fb.group({
            answers: this._fb.array(this.initWorkForm(this.testData))
          });
        } else if (this.testType === 1) {
          this.testData.questions.forEach((item, i) => {
            this._user_answers[i] = [];
          });
        }
      });
    });
  }

  initWorkForm(work): FormGroup[] {
    return work.questions.map((item, i) => {
      return this._fb.group({
        question_index: i,
        answer: ''
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
    let requestData: any = {answers: this.testType === 0 ? this.workForm.value : this._user_answers};
    this._userTestSub = this._token.post(`user-test/complete/${this._testId}`, requestData).subscribe((res: any) => {
      this._router.navigateByUrl('');
    });
  }

  ngOnDestroy() {
    this._routeParamsSub.unsubscribe();
    this._userTestSub.unsubscribe();
  }
}

