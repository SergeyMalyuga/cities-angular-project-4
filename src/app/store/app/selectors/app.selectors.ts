import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../../../core/models/app.state';
import { OfferPreview } from '../../../core/models/offers';

const selectOffersState = createFeatureSelector<AppState['offer']>('offers');
const selectCityState =
  createFeatureSelector<AppState['currentCity']>('currentCity');

export const selectOffersByCity = createSelector(
  selectOffersState,
  selectCityState,
  (offerState, cityState) =>
    Object.values(offerState.entities).filter(
      (offer): offer is OfferPreview => {
        if (offer === undefined) return false;
        return offer.city.name === cityState.name;
      },
    ),
);

export const selectCurrentCity = createSelector(
  selectCityState,
  (city) => city,
);
