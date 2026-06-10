import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appAccessibilityClick]',
})
export class AccessibilityClickDirective {
  @Output() clicked = new EventEmitter<void>();

  @HostListener('click')
  onclick() {
    this.clicked.emit();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      this.clicked.emit();
    }
  }
}
