import { createAction, props } from '@ngrx/store';
import { City } from '../../../core/models/city';

export const changeCity = createAction(
  '[UI] Change City',
  props<{ city: City }>(),
);
