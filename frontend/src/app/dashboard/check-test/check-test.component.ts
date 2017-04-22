import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Component({
  selector: 'et-check-test',
  templateUrl: './check-test.component.html'
})
export class CheckTestComponent implements OnInit {
  public testData: any;
  public rateForm: FormGroup;
  private _testId;
  private _userId;

  constructor(private _token: Angular2TokenService,
              private _routeActivated: ActivatedRoute,
              private _fb: FormBuilder) {
  }

  ngOnInit() {
    this._routeActivated.params.subscribe((res: any) => {
      this._testId = res.test_id;
      this._userId = res.user_id;

      this._token.get(`check-test/${res.test_id}/${res.user_id}`).subscribe((res: any) => {
        this.testData = JSON.parse(res._body).data;
        this.rateForm = this._fb.group({
          rate: ['', Validators.pattern(/^([A-Z]?|\d{0,2})$/)]
        });
      });
    });
  }

  saveRate(){
    let rate = this.rateForm.value.rate;
    this._token.patch(`test-rate/${this._testId}/${this._userId}`, {rate: rate}).subscribe((res: any) => {
      console.log(res);
    });
  }
}
