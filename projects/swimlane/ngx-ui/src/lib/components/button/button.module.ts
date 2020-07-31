import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileButtonComponent } from './file-button.component';
import { ButtonComponent } from './button.component';
import { FileUploadModule } from 'angular-file-10-upload-something';

@NgModule({
  declarations: [FileButtonComponent, ButtonComponent],
  exports: [FileButtonComponent, FileUploadModule, ButtonComponent],
  imports: [CommonModule, FileUploadModule]
})
export class ButtonModule {}
