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
  public testType: number = 1;
  public subjects: Object[] = [];
  public createWork: FormGroup;

  constructor(@Inject(NgZone) private zone: NgZone,
              private _token: Angular2TokenService,
              private _fb: FormBuilder) {
  }

  setSubject(subject) {
    this.createWork.controls['subject_id'].setValue(subject.id);
  }

  ngOnInit() {
    this._token.validateToken().subscribe(() => {
      this.userIdLoaded = true;
      this.options = new NgUploaderOptions({
        url: 'api/uploads',
        filterExtensions: true,
        allowedExtensions: ['doc', 'docx'],
        data: {
          user_id: this._token.currentUserData.id,
          test_type: this.testType,
          variants_count: 999
        },
        autoUpload: true,
        calculateSpeed: true
      });
    });

    this.createWork = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      subject_id: '',
      variants: this._fb.array([
        this.initVariants()
      ])
    });

    this._token.get('subjects').subscribe((res: any) => {
      let subjectsResponse = JSON.parse(res._body).data;
      this.subjects = subjectsResponse.map(item => {
        return {text: item.subject_name, id: item.id};
      });
    });
  }

  initVariants() {
    return this._fb.group({
      questions: this._fb.array([
        this.initQuestions()
      ])
    });
  }

  initQuestions() {
    if (this.testType == 0) {
      return this._fb.group({
        question_text: ['', Validators.required]
      });
    } else if (this.testType == 1) {
      return this._fb.group({
        question_text: ['', Validators.required],
        question_right_answers: [],
        question_answers: this._fb.array([
          this.initAnswers()
        ])
      });
    }
  }

  initAnswers() {
    return this._fb.group({
      answer: ['', Validators.required]
    });
  }

  addVariant() {
    const control = <FormArray>this.createWork.controls['variants'];
    control.push(this.initVariants());
  }

  removeVariant(i: number) {
    const control = <FormArray>this.createWork.controls['variants'];
    control.removeAt(i);
  }

  changeTestType(testType) {
    this.testType = testType;
    this.createWork = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      variants: this._fb.array([
        this.initVariants()
      ])
    });
  }

  save() {
    if (this.createWork.valid) {
      let test_data = {
        subject_id: this.createWork.value.subject_id,
        test: {
          title: this.createWork.value.title,
          variants: this.createWork.value.variants
        }
      };
      this._token.post('create-test', {test_data: test_data})
        .subscribe(res => {
        });
    } else {
      console.error('form doesn\'t valid');
    }
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

