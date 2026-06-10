import { createAction, props } from '@ngrx/store';
import { Offer, OfferPreview } from '../../../core/models/offers';
import { HttpErrorResponse } from '@angular/common/http';

export const loadFavoriteOffers = createAction('[Favorite Offer] Load Offers');
export const loadFavoriteOffersSuccess = createAction(
  '[Favorite Offer] Load Offers Success',
  props<{ favoriteOffers: OfferPreview[] }>(),
);
export const loadFavoriteOffersFailure = createAction(
  '[Favorite Offer] Load Offers Failure',
  props<{ error: HttpErrorResponse }>(),
);

export const toggleFavorite = createAction(
  '[Favorite Offer] Toggle Offer',
  props<{ offerId: string }>(),
);
export const toggleFavoriteSuccess = createAction(
  '[Favorite Offer] Toggle Offer Success',
  props<{ offer: Offer }>(),
);
export const toggleFavoriteFailure = createAction(
  '[Favorite Offer] Toggle Offer Failure',
  props<{ error: HttpErrorResponse }>(),
);
