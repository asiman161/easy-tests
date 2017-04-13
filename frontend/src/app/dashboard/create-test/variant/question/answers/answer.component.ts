import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'et-answer',
  templateUrl: 'answer.component.html'
})
export class AnswerComponent {
  @Input('group')
  public answerForm: FormGroup;

  @Input('answerIndex')
  public answerIndex: number;

  @Output()
  public setAnswer: EventEmitter<any> = new EventEmitter();


  setAnswerIndex() {
    this.setAnswer.emit(this.answerIndex);
  }
}
