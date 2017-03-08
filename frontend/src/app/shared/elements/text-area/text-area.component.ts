import { Component, Input } from '@angular/core';

@Component({
  selector: 'et-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})

export class TextAreaComponent {
  @Input() private errorMessage: string;
  private test:string;
  constructor() { }

  getValue(){

  }

}
