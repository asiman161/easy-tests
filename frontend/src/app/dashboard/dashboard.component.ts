import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public showSidebar = false;

  constructor() {
  }

  openSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}

