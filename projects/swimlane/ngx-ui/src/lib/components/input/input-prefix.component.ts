import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ngx-input-prefix',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputPrefixComponent {}
