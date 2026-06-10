import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  selectAuthStatus,
  selectUserEmail,
} from '../../../store/user/selectors/user.selectors';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../../core/constants/const';
import {logout} from '../../../store/user/actions/user.actions';
import {selectFavoriteOffersTotal} from '../../../store/favorite-offer/selectors/favorite-offer.selectors';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private store = inject(Store);

  protected readonly AppRoute = AppRoute;
  protected readonly AuthorizationStatus = AuthorizationStatus;

  public authStatus = this.store.selectSignal(selectAuthStatus);
  public userEmail = this.store.selectSignal(selectUserEmail);
  public offersTotal = this.store.selectSignal(selectFavoriteOffersTotal);

  public logout(): void {
    if (this.authStatus() === AuthorizationStatus.AUTH) {
      this.store.dispatch(logout());
    }
  }
}
