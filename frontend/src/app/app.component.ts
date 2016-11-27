import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { Angular2TokenService } from './shared/api-factory/angular2-token.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['../styles/application.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent implements OnInit {
  constructor(private _tokenService: Angular2TokenService) {
  }

  ngOnInit(): void {
    this._tokenService.init({
      signInRedirect: 'auth'
    });
  }
}
