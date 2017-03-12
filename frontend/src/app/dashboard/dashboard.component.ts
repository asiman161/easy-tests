import { Component } from '@angular/core';

@Component({
  selector: 'et-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  result = 1;
  public showSidebar = false;

  constructor() {}

  openSidebar(){
    this.showSidebar = !this.showSidebar;
  }
}

