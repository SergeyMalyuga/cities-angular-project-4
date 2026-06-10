import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OfferPreview } from '../../../core/models/offers';
import { TitleCasePipe } from '@angular/common';
import { HoverTrackerDirective } from '../../directives/hover-tracker.directive';
import { RouterLink } from '@angular/router';
import { AppRoute } from '../../../core/constants/const';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  imports: [TitleCasePipe, HoverTrackerDirective, RouterLink],
})
export class OfferCardComponent {
  @Input({ required: true }) offer!: OfferPreview;
  @Output() hovered = new EventEmitter<OfferPreview | null>();

  protected readonly Math = Math;

  public onHovered(isHovered: boolean) {
    if (isHovered) {
      this.hovered.emit(this.offer);
    } else {
      this.hovered.emit(null);
    }
  }

  protected readonly AppRoute = AppRoute;
}
