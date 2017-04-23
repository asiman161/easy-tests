import { Component, OnDestroy, OnInit } from '@angular/core';

import { SidebarTestsList } from './sidebar-tests-list.model';
import { Angular2TokenService } from '../shared/api-factory/angular2-token.service';
import { EventsService } from '../shared/events.service';

@Component({
  selector: 'et-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent implements OnInit, OnDestroy {

  public sidebarLinks: Object = [{name: '', routeLink: ''}];
  public expandedLists: Object = {currentTasks: true, completedTasks: true};
  public studentLists: any = {currentTasks: [], completedTasks: []};
  public sidebarTestsList: SidebarTestsList;
  public userRole: number = 0;

  constructor(private _token: Angular2TokenService,
              private _eventsService: EventsService) {
  }

  ngOnInit(): void {
    this._eventsService.createEmitter();
    this._eventsService.sidebarUpdate.subscribe((data: any = 'update') => {
      switch (data) {
        case 'update':
          this._getSidebar(this.userRole);
          break;
        default:
          this.getUserRole(data);
      }
    });
    this.getUserRole();
  }

  ngOnDestroy():void {
    this._eventsService.sidebarUpdate.unsubscribe();
    this._eventsService.resetEmitter();
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
