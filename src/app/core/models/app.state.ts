import { OffersState } from './offers.state';
import { UserState } from './user.state';
import { FavoriteOffersState } from './favorite-offers.state';
import { City } from './city';
import { CityState } from './city.state';

export interface AppState {
  /*  favoriteOffers: FavoriteOffersState;
  city: City;
  user: UserState;*/
  offers: OffersState;
  currentCity: City;
}
