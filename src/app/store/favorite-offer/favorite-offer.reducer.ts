  import {createEntityAdapter} from '@ngrx/entity';
  import {OfferPreview} from '../../core/models/offers';
  import {FavoriteOfferState} from '../../core/models/favorite-offer.state';
  import {createReducer} from '@ngrx/store';

  export const favoriteOfferAdapter = createEntityAdapter<OfferPreview>();
  const initialState: FavoriteOfferState = favoriteOfferAdapter.getInitialState({
    isLoading: false,
    error: null,
  });

  export const favoriteOfferReducer = createReducer(initialState)
