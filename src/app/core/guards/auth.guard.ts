import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../models/app.state';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {first, map, Observable} from 'rxjs';
import {AppRoute, AuthorizationStatus} from '../constants/const';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private store = inject(Store<AppState>);
  private router = inject(Router);

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this.store.select(selectAuthStatus)
          .pipe(first((status) => status !== AuthorizationStatus.UNKNOWN),
            map(status => {
              if (status === AuthorizationStatus.AUTH) {
                return true;
              }
              return this.router.createUrlTree([AppRoute.LOGIN], {queryParams: {redirectTo: state.url}})
            }))
    }
}
