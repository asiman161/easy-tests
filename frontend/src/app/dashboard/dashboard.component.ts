import {Component} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import 'rxjs/observable/throw';

@Component({
  selector: '[et-dashboard]',
  template: require('./dashboard.component.html')
})
export class DashboardComponent {
  private result = 1;

  constructor(private http:Http) { }

  getInfo() {
    this.getInfo2().subscribe(res => console.log(res));
  }

  getInfo2() {
    return this.http.post('/dashboard/custom', {name: 'test'})
      .map(res => this.result = res.json())
      .catch(this.handle);
  }



  private handle(e: any):Observable<any> {
    console.log('resss');
    return Observable.throw(e.message || e);
  }
}

