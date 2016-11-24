import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { Angular2TokenService } from 'angular2-token';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'et-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private result = 1;

  constructor(private http: Http,
              private router: Router,
              private _tokenService: Angular2TokenService) {
  }

  signOut() {
    this._tokenService.signOut().subscribe(
      res => {
        console.log(res);
        this.router.navigateByUrl('auth');
      },
      error => console.log(error)
    );
  }

  getInfo() {
    this.getInfo2().subscribe(res => console.log(res));
  }

  getInfo2() {
    return this.http.post('/dashboard/custom', {name: 'test'})
      .map(res => this.result = res.json())
      .catch(this.handle);
  }


  private handle(e: any): Observable<any> {
    console.error('error log');
    return Observable.throw(e.message || e);
  }
}

