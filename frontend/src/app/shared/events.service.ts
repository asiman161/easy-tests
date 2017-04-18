import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class EventsService  {
  public sidebarUpdate: EventEmitter<any> = new EventEmitter();
  constructor() {
  }
}
