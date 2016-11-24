import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {Angular2TokenService} from 'angular2-token';

@Component({
  selector: 'et-sign-up',
  templateUrl: './sign-up.component.html',

})

export class SignUpComponent implements OnInit{
  private signUpForm: FormGroup;

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
    console.log(this.signUpForm.controls);
    event.preventDefault();
    this._tokenService.registerAccount(
     this.signUpForm.value.email,
     this.signUpForm.value.password,
     this.signUpForm.value.confirmPassword
    ).subscribe(res => {
       console.log(res);
       this.router.navigateByUrl('');
     },
     error => console.log(error)
    );
  }
}
