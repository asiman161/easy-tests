import { EventEmitter, Injectable } from '@angular/core';

import { SidebarEvent } from './sidebar-event.model';

@Injectable()
export class SidebarEventsService  {
  public sidebarUpdate: EventEmitter<SidebarEvent>;
  constructor() {

  }

  createEmitter(){
    this.sidebarUpdate = new EventEmitter();
  }

  resetEmitter(){
    this.sidebarUpdate = undefined;
  }
}
