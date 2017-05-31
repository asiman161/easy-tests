import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastsManager } from 'ng2-toastr';
import * as _ from 'lodash';

import { SidebarEventsService } from '../../sidebar/sidebar-events.service';
import { TestDoService } from './test-do.service';


@Component({
  selector: 'app-test-do',
  templateUrl: './test-do.component.html',
  styleUrls: ['./test-do.component.scss'],
  providers: [TestDoService]
})
export class TestDoComponent implements OnInit, OnDestroy {
  public testPreparing = true;
  public started = false;
  public testType: number;
  public testName = '';
  public testData: any = {};
  public timer: any;
  public testTime: any = {min: undefined, sec: undefined};
  public variant: number;
  public variants: any;
  public variantsSelect: any;
  public variantSelected: string;
  public workForm: FormGroup;
  private _testId: number;
  private _routeParamsSub: any;
  private _userTestSub: any;
  private _userAnswers: number[][] = [];

  constructor(private _router: Router,
              private _routeActivated: ActivatedRoute,
              private _toastr: ToastsManager,
              private _sidebarEventsService: SidebarEventsService,
              private _testDoService: TestDoService,
              private _fb: FormBuilder) {
  }

  ngOnInit() {
    this._routeParamsSub = this._routeActivated.params.subscribe((res: any) => {
      this._testId = res.id;
      this._testDoService.getVariantMode(this._testId).subscribe((res: any) => {
          clearInterval(this.timer);
          this.testPreparing = true;
          let parsedData = JSON.parse(res._body).data;
          this.testName = parsedData.name;
          if (!parsedData.started) {
            this.variants = parsedData.variants;
            this.testTime.min = parsedData.time;
            this.started = false;
            this.variantsSelect = [];
            for (let i = 0; i < this.variants; i++) {
              this.variantsSelect.push({text: `${i + 1}`, id: `${i}`});
            }
          } else {
            this.started = true;
          }
        });
    });
  }

  setVariant(id) {
    this.variantSelected = id;
  }

  getTest() {
    this._testDoService.getTest(this._testId, this.variantSelected).subscribe((res: any) => {
        this.started = false;
        let parsedData = JSON.parse(res._body);
        this.testType = parsedData.test_type;
        this.testData = parsedData.test_data;
        this.variant = parsedData.variant;
        this.testTime.min = parsedData.time;
        if (this.testType === 0) {
          this.workForm = this._fb.group({
            answers: this._fb.array(this.initWorkForm(this.testData))
          });
        } else if (this.testType === 1) {
          this.testData.questions.forEach((item, i) => {
            this._userAnswers[i] = [];
          });
        }
        this.testPreparing = false;
        if (this.testTime.min > 0) {
          this.testTime.sec = this.testTime.min * 60; // 1 minute has 60 seconds
          this.startTimer();
        } else {
          this.testTime.min = -1;
        }
      });
  }

  private startTimer() {
    this.timer = setInterval(() => {
      if (this.testTime.sec > 0) {
        if (this.testTime.sec % 60 === 0) {
          this.testTime.min--;
        }
        this.testTime.sec--;
      } else {
        clearInterval(this.timer);
        this.completeTest(false);
      }
    }, 1000);
  }

  private initWorkForm(work): FormGroup[] {
    return work.questions.map(() => {
      return this._fb.group({
        answer: ''
      });
    });
  }

  setAnswer(questionId, answerId) {
    if (_.includes(this._userAnswers[questionId], answerId)) {
      this._userAnswers[questionId].splice(this._userAnswers[questionId].indexOf(answerId), 1);
    } else {
      this._userAnswers[questionId].push(answerId);
    }
  }

  completeTest(sendMode: boolean) {
    let requestData: any = {
      answers: this.testType === 0 ? this.workForm.value.answers.map(item => item.answer) : this._userAnswers,
      send_mode: sendMode
    };
    this._userTestSub = this._testDoService.completeTest(this._testId, requestData).subscribe(() => {
      this._toastr.success('Работа успешно выполнена', 'Успешно!');
      this._sidebarEventsService.sidebarUpdate.emit({target: 'update'});
      this._router.navigateByUrl('');
    }, error => {
      this._toastr.error('Что-то пошло не так', 'Ошибка!');
    });
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    if (this._routeParamsSub) {
      this._routeParamsSub.unsubscribe();
    }
    if (this._userTestSub) {
      this._userTestSub.unsubscribe();
    }
  }
}

