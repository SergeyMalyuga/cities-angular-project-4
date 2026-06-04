import { Component, Input } from '@angular/core';
import { OfferPreview } from '../../core/models/offers';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  imports: [TitleCasePipe],
})
export class OfferCardComponent {
  @Input({ required: true }) offer!: OfferPreview;
  protected readonly Math = Math;
}
