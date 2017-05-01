import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';

import { Angular2TokenService } from '../shared/api-factory/angular2-token.service';
import { SidebarEventsService } from './sidebar-events.service';
import { SidebarEvent } from './sidebar-event.model';

@Component({
  selector: 'et-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent implements OnInit, OnDestroy {
  public sidebarLinks: Object = [{name: '', routeLink: ''}];
  public expandedLists: Object = {currentTasks: true, completedTasks: true};
  public studentLists: any = {currentTasks: [], completedTasks: []};
  public sidebarTestsList: any;
  public userRole: number = 0;
  private _sidebarEventsListener: EventEmitter<SidebarEvent>;

  constructor(private _token: Angular2TokenService,
              private _sidebarEventsService: SidebarEventsService) {
  }

  ngOnInit(): void {
    this._sidebarEventsListener = this._sidebarEventsService.sidebarUpdate.subscribe((data: SidebarEvent) => {
      switch (data.target) {
        case 'update':
          this._getSidebar(this.userRole);
          break;
        case 'updateRate':
          let indexes = data.data.indexes;
          this.sidebarTestsList.tests[indexes.groupIndex]
            .subjects[indexes.subjectIndex]
            .tests[indexes.testIndex]
            .users[indexes.userIndex]
            .test_rate = data.data.rate;
          break;
        case 'updateRole':
          this.userRole = data.data.role;
          this._getSidebar(this.userRole);
          this.setSidebarLinks(this.userRole);
          break;
        default:
          this.getUserRole(data.data.role);
      }
    });
  }

  ngOnDestroy(): void {
    this._sidebarEventsListener.unsubscribe();
  }

  private getUserRole(data?) {
    if (data && data.type === 'role') {
      this.userRole = data.role;
      this.setSidebarLinks(data.role);
    } else {
      this._token.validateToken().subscribe(() => {
        let user: any = this._token.currentUserData;
        this.userRole = user.role;
        this.setSidebarLinks(user.role);
      });
    }
  }

  private setSidebarLinks(role: number) {
    this._getSidebar(role);
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

  // TODO: rename this method
  private _getSidebar(role: number) {
    if (role > 0) {
      this._token.get('user-tests').subscribe((res: any) => {
        let tests: any = JSON.parse(res._body).data;
        switch (role) {
          case 1 :
          case 2 :
            this.studentLists.currentTasks = tests.current_tests;
            this.studentLists.completedTasks = tests.completed_tests;
            break;
          case 3 :
            this.sidebarTestsList = tests;
            break;
        }
      });
    }
  }
}
