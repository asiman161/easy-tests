import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {Angular2TokenService} from '../shared/api-factory/angular2-token.service';
import {SidebarTestsList} from './sidebar-tests-list.model';
import {SidebarTestList} from './sidebar-test-list.model';

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
  private userRole: number = 0;

  constructor(private tokenService: Angular2TokenService) {

  }

  ngOnInit(): void {
    this.getUserRole();
  }


  private getUserRole() {
    this.tokenService.validateToken().subscribe(() => {
      let user: any = this.tokenService.currentUserData;
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
          {name: 'Список группы', routeLink: '/'},
          {name: 'Работы', routeLink: '/'}
        ];
        this.sidebarTestsList = {
          tests: [{
            expanded: true,
            caption: 'Английский',
            tests: [
              {name: 'Времена', data: {completed: false}},
              {name: 'Основы английского', data: {completed: false}},
              {name: 'продвинутый англ', data: {completed: true, rate: 5}},
            ]
          }, {
            expanded: true,
            caption: 'Программирование',
            tests: [
              {name: 'c++ циклы', data: {completed: false}},
              {name: 'c++ условные конструкции', data: {completed: true, rate: 4}}
            ]
          }]
        };
        this.buildStudentLists();
        break;
      case 3 :
        this.sidebarLinks = [
          {name: 'Профиль', routeLink: '/profile'},
          {name: 'Список группы', routeLink: '/'},
          {name: 'Список студентов', routeLink: '/'},
          {name: 'Создание работы', routeLink: '/create-test'},
          {name: 'Список работ', routeLink: '/'},
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
    this.studentLists.currentTasks = _.cloneDeep(this.sidebarTestsList);
    this.studentLists.completedTasks = _.cloneDeep(this.sidebarTestsList);

    this.studentLists.currentTasks.tests = this.studentLists.currentTasks.tests.map((test: any) => {

      test.tests = test.tests.filter((item) => !item.data.completed);
      return test;
    });

    this.studentLists.completedTasks.tests = this.studentLists.completedTasks.tests.map((task: any) => {
      task.tests = task.tests.filter(item => item.data.completed);
      return task;
    });
  }

}
