import { EventEmitter, Injectable } from '@angular/core';

import { SidebarEvent } from './sidebar-event.model';

@Injectable()
export class SidebarEventsService  {
  public sidebarUpdate: EventEmitter<SidebarEvent> = new EventEmitter();
  constructor() { }
}
