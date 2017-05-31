import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';

import { Angular2TokenService } from '../shared/api-factory/angular2-token.service';
import { SidebarEventsService } from './sidebar-events.service';
import { SidebarEvent } from './sidebar-event.model';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [SidebarService]
})

export class SidebarComponent implements OnInit, OnDestroy {
  public sidebarLinks: Object = [{name: '', routeLink: ''}];
  public expandedLists: Object = {currentTasks: true, completedTasks: true};
  public studentLists: any = {currentTasks: [], completedTasks: []};
  public sidebarTestsList: any;
  public userRole = 0;
  private _sidebarEventsListener: EventEmitter<SidebarEvent>;

  constructor(private _token: Angular2TokenService,
              private _sidebarEventsService: SidebarEventsService,
              private _sidebarService: SidebarService) {
  }

  ngOnInit(): void {
    this.getUserRole();
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
          this._setSidebarLinks(this.userRole);
          break;
        default:
          this.getUserRole(data.data.role);
      }
    });
  }

  ngOnDestroy(): void {
    this._sidebarEventsListener.unsubscribe();
  }

  private getUserRole(role?) {
    if (role) {
      this.userRole = role;
      this._setSidebarLinks(role);
    } else {
      if (this._token.currentUserData) {
        this.userRole = this._token.currentUserData.role;
        this._setSidebarLinks(this.userRole);
      } else {
        this._token.validateToken().subscribe(() => {
          this.userRole = this._token.currentUserData.role;
          this._setSidebarLinks(this.userRole);
        });
      }
    }
  }

  private _setSidebarLinks(role: number) {
    this._getSidebar(role);
    switch (role) {
      case 1 :
      case 2 :
        this.sidebarLinks = [
          {name: 'Профиль', routeLink: '/profile'},
          {name: 'Группа', routeLink: '/group-list'}
          // {name: 'Работы', routeLink: '/'}
        ];
        break;
      case 3 :
        this.sidebarLinks = [
          {name: 'Профиль', routeLink: '/profile'},
          {name: 'Список групп', routeLink: '/groups-list'},
          // {name: 'Список студентов', routeLink: '/'},
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
      this._sidebarService.getUserTests().subscribe((res: any) => {
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
