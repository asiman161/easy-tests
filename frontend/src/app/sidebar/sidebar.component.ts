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
  public testsList: any;
  private userRole: number = 0;

  constructor(private _token: Angular2TokenService) {

  }

  ngOnInit(): void {
    this.getUserRole();

    this._token.get('user-tests')
      .subscribe(res => {
        let tests:any = res;
        this.testsList = JSON.parse(tests._body).user_tests;
      });
  }


  private getUserRole() {
    this._token.validateToken().subscribe(() => {
      let user: any = this._token.currentUserData;
      this.userRole = user.role;
      this.setSidebarLinks(this.userRole);
    });
  }

  private setSidebarLinks(role: number) {
    switch (role) {
      case 1 :
      case 2 :
        this.sidebarLinks = [
          {name: 'Профиль', routeLink: '/profile'},
          {name: 'Список группы', routeLink: '/group-list'},
          {name: 'Работы', routeLink: '/'}
        ];
        this.buildStudentLists();
        break;
      case 3 :
        this.sidebarLinks = [
          {name: 'Профиль', routeLink: '/profile'},
          {name: 'Список группы', routeLink: '/'},
          {name: 'Список студентов', routeLink: '/'},
          {name: 'Создание работы', routeLink: '/create-test'},
          {name: 'Список работ', routeLink: '/tests-list'},
          {name: 'Список предметов', routeLink: '/'}
        ];
        this.sidebarTestsList = {
          tests: [{
            expanded: true,
            caption: 'ПОКС-11',
            tests: [{
              name: 'Основы программирования',
              expanded: true,
              data: {
                examName: 'Алгоритмы',
                expanded: true,
                students: [
                  {name: 'Иванов Иван'},
                  {name: 'Петров Петр', rate: 5}
                ]
              }
            }, {
              name: 'Основы C++',
              expanded: true,
              data: {
                examName: 'циклы',
                expanded: true,
                students: [
                  {name: 'Иванов Иван', rate: 3},
                  {name: 'Петров Петр', rate: 4}
                ]
              }
            }]
          }, {
            expanded: true,
            caption: 'ПОКС-22',
            tests: [{
              name: 'Кибернетика',
              expanded: true,
              data: {
                examName: 'Ардуино',
                expanded: true,
                students: [
                  {name: 'Александр Павлов', rate: 3},
                  {name: 'Мария Павлова'}
                ]
              }
            }, {
              name: 'Машинное обучение',
              expanded: true,
              data: {
                examName: 'Python',
                expanded: true,
                students: [
                  {name: 'Александр Павлов'},
                  {name: 'Мария Павлова', rate: 5}
                ]
              }
            }]
          }]
        };
        break;
      default :
        this.sidebarLinks = [
          {name: 'Профиль', routeLink: '/profile'}
        ];
        break;
    }
  }

  private buildStudentLists() {
    this._token.get('user-tests').subscribe(res => {
      let tests:any = res;
      tests = (JSON.parse(tests._body));
      this.studentLists.currentTasks = tests.current_tests;
      this.studentLists.completedTasks = tests.completed_tests;
    });
  }

}
