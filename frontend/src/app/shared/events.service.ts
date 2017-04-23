import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class EventsService  {
  public sidebarUpdate: EventEmitter<any>;
  constructor() {

  }

  createEmitter(){
    this.sidebarUpdate = new EventEmitter();
  }

  resetEmitter(){
    this.sidebarUpdate = undefined;
  }
}
