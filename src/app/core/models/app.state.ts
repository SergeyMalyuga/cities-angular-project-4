import {OffersState} from './offers.state';
import {UserState} from './user.state';
import {FavoriteOffersState} from './favorite-offers.state';
import {City} from './city';

export interface AppState {
  favoriteOffers: FavoriteOffersState;
  city: City;
  offers: OffersState;
  user: UserState;
}
