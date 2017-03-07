import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { NgUploaderOptions } from 'ngx-uploader';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Component({
  selector: 'et-create-work',
  templateUrl: './create-test.component.html',
})
export class CreateTestComponent implements OnInit {
  options: NgUploaderOptions;
  response: any;
  hasBaseDropZoneOver: boolean;
  userId: number;
  userIdLoaded: boolean = false;
  public createWork: FormGroup;

  constructor(@Inject(NgZone) private zone: NgZone,
              private _token: Angular2TokenService,
              private _fb: FormBuilder) {
    _token.validateToken().subscribe(() => {
      this.userIdLoaded = true;
      this.options = new NgUploaderOptions({
        url: 'api/uploads',
        filterExtensions: true,
        allowedExtensions: ['doc', 'docx'],
        data: {
          user_id: _token.currentUserData.id,
          test_type: 1,
          variants_count: 999
        },
        autoUpload: true,
        calculateSpeed: true
      });
    });
  }

  ngOnInit(){

  }

  send() {
    let testData = {
      title: 'test work',
      variants: [
        {questions: ['var 1 quest 1', 'var 1 quest 2', 'var 1 quest 3']},
        {questions: ['var 2 quest 1', 'var 2 quest 2', 'var 2 quest 3']}
      ]
    };
    this._token.post('create-test', {testData})
      .subscribe(res => console.log(res))
      .unsubscribe();
  }


  handleUpload(data: any) {
    setTimeout(() => {
      this.zone.run(() => {
        this.response = data;
        if (data && data.response) {
          this.response = JSON.parse(data.response);
        }
      });
    });
  }

  fileOverBase(e: boolean) {
    this.hasBaseDropZoneOver = e;
  }
}

