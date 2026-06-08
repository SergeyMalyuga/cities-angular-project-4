import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import { offerReducer } from '../offer/offer.reducer';
import { cityReducer } from '../city/city.reducer';
import {userReducer} from '../user/user.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  offers: offerReducer,
  currentCity: cityReducer,
  user: userReducer,
};
