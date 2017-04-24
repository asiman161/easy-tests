import { Component, OnInit } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { ToastsManager } from 'ng2-toastr';
import { EventsService } from '../../shared/events.service';

@Component({
  selector: 'et-dashboard',
  templateUrl: './tests-list.component.html'
})
export class TestsListComponent implements OnInit {
  public subjectsList;

  constructor(private _token: Angular2TokenService,
              private _toastr: ToastsManager,
              private _eventsService: EventsService) {
  }

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    this._token.get('teacher-tests')
      .subscribe((res: any) => {
        this.subjectsList = JSON.parse(res._body).data;
      });
  }

  changeTestVisibility(id: number, visibility: boolean, subject_index: number, test_index: number) {
    this._token.patch(`test-visibility/${id}`, {show_test: visibility})
      .subscribe((res: any) => {
        this._toastr.success('Видимость работы изменена', 'Успешно!');
        this.subjectsList[subject_index].tests[test_index].show_test = !visibility;
      }, error => {
        this._toastr.error('Что-то пошло не так', 'Ошибка!');
      });
  }

  deleteTest(id: number, subject_index: number, test_index: number){
    this._token.delete(`tests/${id}`)
      .subscribe((res: any) => {
        this._toastr.success('Работа успешно удалена', 'Успешно!');
        this.subjectsList[subject_index].tests.splice(test_index, 1);
        this._eventsService.sidebarUpdate.emit('update');
      }, error => {
        this._toastr.error('Что-то пошло не так', 'Ошибка!');
      });
  }
}

