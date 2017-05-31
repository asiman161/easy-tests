import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastsManager } from 'ng2-toastr';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  providers: [FeedbackService]
})

export class FeedbackComponent implements OnInit {

  public feedbackForm: FormGroup;

  constructor(private _token: Angular2TokenService,
              private _fb: FormBuilder,
              private _router: Router,
              private _toastr: ToastsManager,
              private _feedbackService: FeedbackService) {
  }


  ngOnInit() {
    this.feedbackForm = this._fb.group({
      description: ['', Validators.required],
      message: ['', Validators.required]
    });
  }


  leftFeedback() {
    if (this.feedbackForm.valid) {
      this._feedbackService.leftFeedback(this.feedbackForm.value).subscribe(() => {
        this._toastr.success('Отзыв успешно отправлен', 'Успешно!');
        this._router.navigateByUrl('/');
      }, error => {
        this._toastr.error('Что-то пошло не так', 'Ошибка!');
      });
    } else {
      this._toastr.error('В форме присутствуют ошибки\nУбедитесь, что все поля заполненны верно', 'Ошибка!');
    }
  }


}
