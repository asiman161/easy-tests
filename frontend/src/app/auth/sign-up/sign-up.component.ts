import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {Angular2TokenService} from '../../shared/api-factory/angular2-token.service';

@Component({
  selector: 'et-sign-up',
  templateUrl: './sign-up.component.html',

})

export class SignUpComponent implements OnInit{
  public signUpForm: FormGroup;

  constructor(private router:Router,
              private formBuilder:FormBuilder,
              private _tokenService:Angular2TokenService) {
  }

  ngOnInit(){
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  signUp(event) {
    event.preventDefault();
    this._tokenService.registerAccount(
     this.signUpForm.value.email,
     this.signUpForm.value.password,
     this.signUpForm.value.confirmPassword
    ).subscribe(res => {
       this.router.navigateByUrl('');
     },
     error => console.error(error)
    );
  }
}
