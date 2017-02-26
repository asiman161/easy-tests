import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'et-variant',
  templateUrl: 'variant.component.html'
})
export class VariantComponent {
  // we will pass in address from App component
  @Input('group')
  public variantForm: FormGroup;
}
