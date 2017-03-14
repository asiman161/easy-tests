import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'et-question',
  templateUrl: 'question.component.html'
})
export class QuestionComponent implements OnInit{
  @Input('group')
  public questionForm: FormGroup;

  @Input('testType')
  public testType: number;

  private question_right_answers: number[] = [];

  constructor(private _fb: FormBuilder) {}

  ngOnInit(){
    this.question_right_answers = [];
    this.questionForm.controls['question_right_answers'].setValue(this.question_right_answers);
  }

  setAnswer(answerValue) {
    if (_.includes(this.question_right_answers, answerValue)) {
      this.question_right_answers.splice(this.question_right_answers.indexOf(answerValue), 1);
      this.questionForm.controls['question_right_answers'].setValue(this.question_right_answers);
    } else if (answerValue > -1) {
      this.question_right_answers.push(answerValue);
      this.questionForm.value.question_right_answers = this.question_right_answers;
      this.questionForm.controls['question_right_answers'].setValue(this.question_right_answers);
    }

  }

  addAnswer() {
    const control = <FormArray>this.questionForm.controls['question_answers'];
    control.push(this.initAnswers());
  }

  initAnswers() {
    return this._fb.group({
      answer: ['', Validators.required]
    });
  }

  removeAnswer(i: number) {
    const control = <FormArray>this.questionForm.controls['question_answers'];
    control.removeAt(i);

    if (_.includes(this.question_right_answers, i)) {
      this.question_right_answers.splice(this.question_right_answers.indexOf(i), 1);
      this.question_right_answers = this.question_right_answers.map((item) => {
        return item >= i ? item - 1 : item;
      });
    }
    this.questionForm.controls['question_right_answers'].setValue(this.question_right_answers);
  }

}
