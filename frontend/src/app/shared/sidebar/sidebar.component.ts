import { Component, OnInit } from '@angular/core';

import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'et-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent implements OnInit {

  private sidebarLinks: Object[] = [{name: '', routeLink: ''}];
  private user: any = {};

  constructor(private tokenService: Angular2TokenService) {

  }

  ngOnInit(): void {
    this.getUserRole();
  }

  private getUserRole(){
    let self = this;
    let user: any;
    setTimeout(function repeat(){
      user = self.tokenService.currentUserData;
      setTimeout(() => {
        user ? self.setSidebarLinks(user.role) : repeat();
      }, 50);
    }, 50);
  }

  private setSidebarLinks(role:number){
    switch (role) {
      case 1 :
      case 2 :
        this.sidebarLinks = [
          {name: 'Список группы', routeLink: '/'},
          {name: 'Работы', routeLink: '/'}
        ];
        break;
      case 3 :
        this.sidebarLinks = [
          {name: 'Список группы', routeLink: '/'},
          {name: 'Список студентов', routeLink: '/'},
          {name: 'Создание работы', routeLink: '/'},
          {name: 'Список работ', routeLink: '/'},
          {name: 'Список предметов', routeLink: '/'}
        ];
        break;
      default :
        this.sidebarLinks = [
          {name: 'Профиль', routeLink: '/'},
        ];
        break;
    }
  }

}