import { Component, OnInit } from '@angular/core';

import { ToastsManager } from 'ng2-toastr';
import { SidebarEventsService } from '../../sidebar/sidebar-events.service';
import { TestsListService } from './tests-list.service';

@Component({
  selector: 'app-tests-list',
  templateUrl: './tests-list.component.html',
  providers: [TestsListService]
})
export class TestsListComponent implements OnInit {
  public subjectsList;

  constructor(private _toastr: ToastsManager,
              private _sidebarEventsService: SidebarEventsService,
              private _testsListService: TestsListService) {
  }

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    this._testsListService.getTests().subscribe((res: any) => {
      this.subjectsList = JSON.parse(res._body).data;
    });
  }

  changeTestVisibility(id: number, visibility: boolean, subject_index: number, test_index: number) {
    this._testsListService.changeTestVisibility(id, visibility).subscribe(() => {
      this._toastr.success('Видимость работы изменена', 'Успешно!');
      this.subjectsList[subject_index].tests[test_index].show_test = !visibility;
    }, error => {
      this._toastr.error('Что-то пошло не так', 'Ошибка!');
    });
  }

  deleteTest(id: number, subject_index: number, test_index: number) {
    this._testsListService.deleteTest(id).subscribe(() => {
        this._toastr.success('Работа успешно удалена', 'Успешно!');
        this.subjectsList[subject_index].tests.splice(test_index, 1);
        this._sidebarEventsService.sidebarUpdate.emit({target: 'update'});
      }, error => {
        this._toastr.error('Что-то пошло не так', 'Ошибка!');
      });
  }
}

