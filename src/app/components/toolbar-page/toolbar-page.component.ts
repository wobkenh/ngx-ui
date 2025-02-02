import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-toolbar-page',
  templateUrl: './toolbar-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarPageComponent {
  toolbarMenu = [
    {
      label: 'File',
      click: () => {
        console.log('File clicked');
      }
    },
    {
      label: 'Run',
      disabled: true
    },
    {
      label: 'Edit',
      dropdown: true,
      click: () => {
        console.log('Edit clicked');
      }
    }
  ];

  menuClicked(event) {
    console.log('Menu clicked', event);
  }
}
