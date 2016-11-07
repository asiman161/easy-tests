import {Component} from '@angular/core';

import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('../styles/application.scss'), require('./app.component.scss')]
})

export class AppComponent {
  constructor(private _tokenService: Angular2TokenService){
    this._tokenService.init({
      signInRedirect: 'auth'
    });
  }

}
