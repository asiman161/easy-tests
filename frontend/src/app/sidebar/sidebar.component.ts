import { Component, OnInit } from '@angular/core';
import {Angular2TokenService} from '../shared/api-factory/angular2-token.service';
import {SidebarTestsList} from './sidebar-tests-list.model';

@Component({
  selector: 'et-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent implements OnInit {

  public sidebarLinks: Object = [{name: '', routeLink: ''}];
  public expandedLists: Object = {currentTasks: true, completedTasks: true};
  public studentLists: any = {currentTasks: [], completedTasks: []};
  public sidebarTestsList: SidebarTestsList;
  public sidebarTestsList2: any;
  public testsList: any;
  private userRole: number = 0;

  constructor(private _token: Angular2TokenService) {

  }

  ngOnInit(): void {
    this.getUserRole();
  }


  private getUserRole() {
    this._token.validateToken().subscribe(() => {
      let user: any = this._token.currentUserData;
      this.userRole = user.role;
      this.setSidebarLinks(this.userRole);
    });
  }

  private setSidebarLinks(role: number) {
    this.buildStudentLists(role);
    switch (role) {
      case 1 :
      case 2 :
        this.sidebarLinks = [
          {name: 'Профиль', routeLink: '/profile'},
          {name: 'Список группы', routeLink: '/group-list'},
          {name: 'Работы', routeLink: '/'}
        ];
        break;
      case 3 :
        this.sidebarLinks = [
          {name: 'Профиль', routeLink: '/profile'},
          {name: 'Список групп', routeLink: '/groups-list'},
          {name: 'Список студентов', routeLink: '/'},
          {name: 'Создание работы', routeLink: '/create-test'},
          {name: 'Список работ', routeLink: '/tests-list'},
          {name: 'Список предметов', routeLink: '/subjects-list'}
        ];
        break;
      default :
        this.sidebarLinks = [
          {name: 'Профиль', routeLink: '/profile'}
        ];
        break;
    }
  }

  private buildStudentLists(role: number) {
    this._token.get('user-tests').subscribe((res: any) => {
      let tests: any = JSON.parse(res._body).data;
      switch(role){
        case 1 :
        case 2 :
          this.studentLists.currentTasks = tests.current_tests;
          this.studentLists.completedTasks = tests.completed_tests;
          break;
        case 3 :
          this.sidebarTestsList2 = tests;
          break;
      }

    });
  }

}
