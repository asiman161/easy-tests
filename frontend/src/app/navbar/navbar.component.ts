import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Angular2TokenService } from '../shared/api-factory/angular2-token.service';

@Component({
  selector: 'et-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {


  constructor(private router: Router,
              private _tokenService: Angular2TokenService) {
  }

  signOut() {
    this._tokenService.signOut().subscribe(res => {
        this.router.navigateByUrl('auth');
      },
      error => console.log(error)
    );
  }

}
