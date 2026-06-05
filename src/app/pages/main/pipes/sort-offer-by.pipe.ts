import {Pipe, PipeTransform} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {SortType} from '../../../core/constants/const';

@Pipe({
  name: 'sortOfferBy',
})
export class SortOfferByPipe implements PipeTransform {
  transform(offers: OfferPreview[], sortType: SortType): OfferPreview[] {
    if (!offers) {
      return [];
    }

    const getPrice = (offer: OfferPreview) => offer.price ?? 0;
    const getRating = (offer: OfferPreview) => offer.rating ?? 0;

    switch (sortType) {
      case SortType.PRICE_LOW_TO_HIGH:
        return [...offers].sort((a, b) => getPrice(a) - getPrice(b));
      case SortType.PRICE_HIGH_TO_LOW:
        return [...offers].sort((a, b) => getPrice(b) - getPrice(a));
      case SortType.TOP_RATED_FIRST:
        return [...offers].sort((a, b) => getRating(b) - getRating(a));
      default:
        return [...offers];
    }
  }
}
