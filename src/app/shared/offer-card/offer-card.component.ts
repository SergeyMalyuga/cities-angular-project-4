import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OfferPreview} from '../../core/models/offers';
import {TitleCasePipe} from '@angular/common';
import {HoverTrackerDirective} from '../directives/hover-tracker.directive';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  imports: [TitleCasePipe, HoverTrackerDirective],
})
export class OfferCardComponent {
  @Input({required: true}) offer!: OfferPreview;
  @Output() hovered = new EventEmitter<OfferPreview | null>();

  protected readonly Math = Math;

  public onHovered(isHovered: boolean) {
    if (isHovered) {
      this.hovered.emit(this.offer);
    } else {
      this.hovered.emit(null);
    }
  }
}
