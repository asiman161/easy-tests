import { Component } from '@angular/core';
import { Http } from '@angular/http';


import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'et-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  result = 1;
  public showSidebar = false;

  constructor(private http: Http) {
  }

  //TODO: remove it
  getInfo2() {
    return this.http.post('/dashboard/custom', {name: 'test'})
      .map(res => this.result = res.json())
      .catch(this.handle);
  }


  private handle(e: any): Observable<any> {
    console.error('error log');
    return Observable.throw(e.message || e);
  }

  test(){
    this.showSidebar = !this.showSidebar;
  }
}

