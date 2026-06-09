import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../core/constants/const';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private store = inject(Store);

  public authStatus = this.store.selectSignal(selectAuthStatus);
  protected readonly AppRoute = AppRoute;
  protected readonly AuthorizationStatus = AuthorizationStatus;
}
