import { Pipe, PipeTransform } from '@angular/core';
import { SidebarTestList } from './sidebar-test-list.model';

@Pipe({name: 'completedTest'})
export class SidebarListPipe implements PipeTransform {
  transform(tests: SidebarTestList[], completed):SidebarTestList[] {
    //noinspection TypeScriptValidateTypes
    return tests.filter((test: SidebarTestList) => {
      if(test.data.completed === completed) {
        return test;
      }
    });
  }
}
