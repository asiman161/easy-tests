import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ToastsManager } from 'ng2-toastr';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { SidebarEventsService } from '../../sidebar/sidebar-events.service';
import { CheckTestService } from './check-test.service';

@Component({
  selector: 'app-check-test',
  templateUrl: './check-test.component.html',
  providers: [CheckTestService]
})
export class CheckTestComponent implements OnInit {
  public testData: any;
  public rateForm: FormGroup;
  public minutes: any;
  public seconds: any;
  private _updateRateData: any;
  private _testId;
  private _userId;

  constructor(private _token: Angular2TokenService,
              private _routeActivated: ActivatedRoute,
              private _fb: FormBuilder,
              private _toastr: ToastsManager,
              private _sidebarEventsService: SidebarEventsService,
              private _checkTestService: CheckTestService) {
  }

  ngOnInit() {
    this._routeActivated.queryParams.subscribe((res: any) => {
      this._updateRateData = res;
    });
    this._routeActivated.params.subscribe((res: any) => {
      this._testId = res.test_id;
      this._userId = res.user_id;

      this._token.get(`check-test/${res.test_id}/${res.user_id}`).subscribe((res: any) => {
        this.testData = JSON.parse(res._body).data;
        this.minutes = Math.round(this.testData.time / 60);
        this.seconds = this.testData.time % 60;
        this.rateForm = this._fb.group({
          rate: ['', Validators.pattern(/^([A-Z]?|\d{0,2})$/)]
        });
      });
    });
  }

  saveRate() {
    const rate = this.rateForm.value.rate;
    this._checkTestService.saveRate(this._testId, this._userId, rate).subscribe((res: any) => {
      this._sidebarEventsService.sidebarUpdate.emit({
        target: 'updateRate', data: {
          indexes: this._updateRateData,
          rate: rate
        }
      });
      this._toastr.success('Вы выставили оценку', 'Успешно!');
    }, error => {
      this._toastr.success('Что-то пошло не так', 'Ошибка!');
    });
  }
}
