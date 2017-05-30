import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-variant',
  templateUrl: 'variant.component.html'
})
export class VariantComponent {
  @Input('variantForm') public variantForm: FormGroup;
  @Input('testType') public testType: number;

  public questionsCountArray: number[] = [0];

  constructor(private _fb: FormBuilder) {
  }


  addQuestion() {
    const control = <FormArray>this.variantForm.controls['questions'];
    control.push(this.initQuestions());
    this.questionsCountArray.push(0);
  }

  initQuestions() {
    if (this.testType === 0) {
      return this._fb.group({
        question_text: ['', Validators.required]
      });
    } else if (this.testType === 1) {
      return this._fb.group({
        question_text: ['', Validators.required],
        question_right_answers: [],
        question_answers: this._fb.array([
          this.initAnswers()
        ])
      });
    }
  }

  initAnswers() {
    return this._fb.group({
      answer: ['', Validators.required]
    });
  }

  removeQuestion(i: number) {
    const control = <FormArray>this.variantForm.controls['questions'];
    control.removeAt(i);
    this.questionsCountArray.pop();
  }

}
