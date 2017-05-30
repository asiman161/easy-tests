import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-answer',
  templateUrl: 'answer.component.html'
})
export class AnswerComponent {
  @Input('answerForm') public answerForm: FormGroup;
  @Input('answerIndex') public answerIndex: number;
  @Input('answersCount') public answersCount: number;
  @Output() public setAnswer: EventEmitter<any> = new EventEmitter();
  @Output() public removeAnswer: EventEmitter<any> = new EventEmitter();


  setAnswerIndex() {
    this.setAnswer.emit(this.answerIndex);
  }

  removeAnswerIndex() {
    this.removeAnswer.emit(this.answerIndex);
  }
}
