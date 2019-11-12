import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
  Renderer2,
  TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'ngx-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('visibilityTransition', [
      state(
        'active',
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)'
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'scale3d(1.2, 1.2, 1.2)'
        }),
        animate('0.2s ease-out')
      ]),
      transition('* => inactive', [
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)'
        }),
        animate(
          '0.2s ease-out',
          style({
            transform: 'scale3d(0.9, 0.9, 1)',
            opacity: 0
          })
        )
      ])
    ])
  ],
  host: {
    tabindex: '-1'
  }
})
export class DialogComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() visible: boolean;
  @Input() zIndex: number;
  @Input() title: string;
  @Input() dialogTitle: string;
  @Input() content: string;
  @Input() template: TemplateRef<any>;
  @Input() cssClass: string;
  @Input() context: any;
  @Input() closeOnBlur: boolean;
  @Input() closeOnEscape: boolean;
  @Input() closeButton: boolean;
  @Input() class: string;

  @Output() open = new EventEmitter();
  @Output() close = new EventEmitter();

  get contentzIndex(): number {
    return this.zIndex + 1;
  }

  get visibleState(): string {
    return this.visible ? 'active' : 'inactive';
  }

  constructor(
    private element: ElementRef,
    private renderer2: Renderer2,
  ) {}

  ngOnInit(): void {
    if (this.visible) this.show();
    // backwards compatibility
    if (this.title) {
      this.dialogTitle = this.title;
      this.renderer2.removeAttribute(this.element.nativeElement, 'title');
    }
  }

  show(): void {
    this.visible = true;
    this.open.emit();
  }

  @HostListener('keydown.esc')
  onKeyDown(): void {
    if (this.closeOnEscape) this.hide();
  }

  hide(): void {
    this.visible = false;
    this.close.emit();
  }

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target): void {
    if (this.containsTarget(target)) {
      this.hide();
    }
  }

  containsTarget(target): boolean {
    return this.closeOnBlur && target.classList.contains('dialog');
  }

  /**
   * On destroy callback
   *
   * @memberOf DrawerComponent
   */
  ngOnDestroy() {
    this.close.emit(true);
  }
}
