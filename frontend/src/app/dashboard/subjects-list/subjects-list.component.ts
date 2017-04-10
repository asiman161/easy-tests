import { Component, OnInit } from '@angular/core';

import { Angular2TokenService } from '../../shared/api-factory/angular2-token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'et-subjects-list',
  templateUrl: 'subjects-list.component.html',
})

export class SubjectsListComponent implements OnInit {
  public subjects = [];
  public creatingSubject = false;
  public createSubjectForm: FormGroup;

  constructor(private _token: Angular2TokenService,
              private _fb: FormBuilder) {
  }

  ngOnInit() {
    this._token.get('subjects').subscribe((res:any) => {
      this.subjects = JSON.parse(res._body).data;
    });
  }

  deleteSubject(id){
    this._token.delete(`subjects/${id}`).subscribe((res:any) => {
      this.subjects = JSON.parse(res._body).data;
    });
  }

  createSubject(){
    this.creatingSubject = true;
    this.createSubjectForm = this._fb.group({
      subject_name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  saveSubject(form){
    this._token.post('subjects', {subject_name: form.value.subject_name})
      .subscribe((res: any) => {
        this.subjects = JSON.parse(res._body).data;
        this.creatingSubject = false;
      });
  }
}
