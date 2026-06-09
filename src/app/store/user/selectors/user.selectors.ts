import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';

const selectUserSelectors = createFeatureSelector<AppState['user']>('user');

export const selectAuthStatus = createSelector(
  selectUserSelectors,
  state => state.authorizationStatus
)
