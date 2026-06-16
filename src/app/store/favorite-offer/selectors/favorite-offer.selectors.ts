import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {favoriteOfferAdapter} from '../favorite-offer.reducer';

const selectFavoriteOfferState =
  createFeatureSelector<AppState['favoriteOffer']>('favoriteOffer');
const favoriteOfferSelectors = favoriteOfferAdapter.getSelectors(
  selectFavoriteOfferState,
);

export const selectFavoriteOffers = favoriteOfferSelectors.selectAll;
export const selectFavoriteOffersTotal = favoriteOfferSelectors.selectTotal;
export const selectIsFavoriteOffersLoading = createSelector(
  selectFavoriteOfferState,
  state => state.isLoading
)
export const selectUpdateStatus = createSelector(
  selectFavoriteOfferState,
  state => state.success
)
