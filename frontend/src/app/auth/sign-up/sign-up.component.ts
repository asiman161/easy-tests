import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',

})

export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private _toastr: ToastsManager,
              private _tokenService: Angular2TokenService) {
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  signUp() {
    const equalPasswords = this.signUpForm.controls.password.value === this.signUpForm.controls.confirmPassword.value;
    if (this.signUpForm.valid && equalPasswords) {
      this._tokenService.registerAccount(
        this.signUpForm.value.email,
        this.signUpForm.value.password,
        this.signUpForm.value.confirmPassword
      ).subscribe(res => {
          this.router.navigateByUrl('');
        },
        error => {
          this._toastr.error('Что-то пошло не так', 'Ошибка!');
        });
    } else {
      this._toastr.error('Убедитесь, что все поля заполнены верно', 'Ошибка!');
    }
  }
}
