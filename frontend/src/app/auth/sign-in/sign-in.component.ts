import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html'
})

export class SignInComponent implements OnInit {
  public signInForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private _toastr: ToastsManager,
              private _tokenService: Angular2TokenService) {
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  signIn() {
    if (this.signInForm.valid) {
      this._tokenService.signIn(
        this.signInForm.value.email,
        this.signInForm.value.password
      ).subscribe(res => {
        this.router.navigateByUrl('');
      }, error => {
        if (error.status === 401) {
          this._toastr.error('Невозможно войти с предоставленными данными', 'Ошибка!');
        } else {
          this._toastr.error('Что-то пошло не так', 'Ошибка!');
        }
      });
    } else {
      this._toastr.error('Убедитесь, что все поля заполнены верно', 'Ошибка!');
    }
  }
}
