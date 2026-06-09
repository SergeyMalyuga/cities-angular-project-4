import {UserState} from '../../core/models/user.state';
import {AuthorizationStatus, DEFAULT_USER} from '../../core/constants/const';
import {createReducer, on} from '@ngrx/store';
import {
  checkAuth,
  checkAuthFailure,
  checkAuthSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout, logoutFailure, logoutSuccess
} from './actions/user.actions';

const initialState: UserState = {
  user: DEFAULT_USER,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isLoading: false,
  error: null,
}

export const userReducer = createReducer(initialState,
  on(checkAuth, state => ({
    ...state, isLoading: true
  })),
  on(checkAuthSuccess, (state, {user}) => ({
    ...state, user, authorizationStatus: AuthorizationStatus.AUTH, isLoading: false, error: null
  })),
  on(checkAuthFailure, (state, {error}) => ({
    ...state, error, authorizationStatus: AuthorizationStatus.UN_AUTH, isLoading: false
  })),

  on(login, state => ({
    ...state, isLoading: true
  })),
  on(loginSuccess, (state, {user}) => ({
    ...state, user, authorizationStatus: AuthorizationStatus.AUTH, isLoading: false, error: null
  })),
  on(loginFailure, (state, {error}) => ({
    ...state, error, authorizationStatus: AuthorizationStatus.UN_AUTH, isLoading: false
  })),

  on(logout, state => ({
    ...state, isLoading: true
  })),
  on(logoutSuccess, state => ({
    ...state, authorizationStatus: AuthorizationStatus.UN_AUTH, user: DEFAULT_USER, isLoading: false, error: null
  })),
  on(logoutFailure, (state, {error}) => ({
    ...state, error, isLoading: false
  }))
);
