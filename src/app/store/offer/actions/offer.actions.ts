import { createAction, props } from '@ngrx/store';
import { OfferPreview } from '../../../core/models/offers';
import { HttpErrorResponse } from '@angular/common/http';

export const loadOffers = createAction(`[Offers] Load Offers`);
export const loadOffersSuccess = createAction(
  '[Offers API] Load Offers Success',
  props<{ offers: OfferPreview[] }>(),
);
export const loadOffersFailure = createAction(
  '[Offers API] Load Offers Failure',
  props<{ error: HttpErrorResponse }>(),
);
