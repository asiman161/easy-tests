import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ToastsManager } from 'ng2-toastr';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { SidebarEventsService } from '../../sidebar/sidebar-events.service';

@Component({
  selector: 'et-subjects-list',
  templateUrl: 'subjects-list.component.html',
})

export class SubjectsListComponent implements OnInit {
  public subjects = [];
  public creatingSubject = false;
  public createSubjectForm: FormGroup;

  constructor(private _token: Angular2TokenService,
              private _fb: FormBuilder,
              private _toastr: ToastsManager,
              private _sidebarEventsService: SidebarEventsService) {
  }

  ngOnInit() {
    this._token.get('subjects').subscribe((res: any) => {
      this.subjects = JSON.parse(res._body).data;
    });
  }

  deleteSubject(id) {
    this._token.delete(`subjects/${id}`)
      .subscribe((res: any) => {
        this.subjects = JSON.parse(res._body).data;
        this._sidebarEventsService.sidebarUpdate.emit({target: 'update'});
        this._toastr.success('Предмет успешно Удален', 'Успешно!');
      }, error => {
        this._toastr.error('Что-то пошло не так', 'Ошибка!');
      });
  }

  createSubject() {
    this.creatingSubject = true;
    this.createSubjectForm = this._fb.group({
      subject_name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  saveSubject(form) {
    this._token.post('subjects', {subject_name: form.value.subject_name})
      .subscribe((res: any) => {
        this._toastr.success('Предмет успешно создан', 'Успешно!');
        this.subjects = JSON.parse(res._body).data;
        this.creatingSubject = false;
      }, error => {
        this._toastr.error('Что-то пошло не так', 'Ошибка!');
      });
  }
}
