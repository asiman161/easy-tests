import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {Angular2TokenService} from 'angular2-token';

@Component({
  selector: 'et-auth-in',
  template: require('./sign-in.component.html')
  //template: ''
})

export class SignInComponent implements OnInit {
  private signInForm:FormGroup;

  constructor(private router:Router,
              private formBuilder:FormBuilder,
              private _tokenService:Angular2TokenService) {
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signIn(event) {
    event.preventDefault();
    console.log(1);
    this._tokenService.signIn(
      this.signInForm.value.email,
      this.signInForm.value.password
    ).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('');
      },
      error => console.log(error)
    );
  }
}
