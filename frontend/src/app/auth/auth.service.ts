import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {Http} from '@angular/http';

import { Angular2TokenService } from 'angular2-token';

import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/toPromise';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import 'rxjs/observable/throw';

@Injectable()
export class AuthService implements CanActivate {

  constructor(private router:Router,
              private http:Http,
              private _tokenService: Angular2TokenService) {
  }

  canActivate() {
    // If user is not logged in we'll send them to the homepage

    //if (Math.random() > 0.5) {
    //  this.router.navigate(['']);
    //  return false;
    //}
    if (this._tokenService.userSignedIn()){
      console.log(111, this._tokenService.currentUserData, 'signedIn');
      this.router.navigate(['']);
      return false;
    }
    console.log(222, this._tokenService.currentUserData, 'guest');
    return true;
  }

  login() {
    //console.log('logging');
    //this.aa().subscribe(res => console.log(res));
  }

  aa() {
    //return this.http.post('/users/sign_in', {}).catch(this.handle);
    //return this.http.post('/dashboard/custom', {}).catch(this.handle);
  }

  // getInfo() {
  //   this.getInfo2().subscribe(res => console.log(res));
  // }
  //
  // getInfo2() {
  //   return this.http.post('/dashboard/custom', {name: 'test'})
  //     .map(res => this.result = res.json())
  //     .catch(this.handle);
  // }


  private handle(e:any):Observable<any> {
    console.log('resss');
    return Observable.throw(e.message || e);
  }

}
