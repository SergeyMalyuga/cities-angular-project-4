import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import { selectOffersByCity } from '../../store/app/selectors/app.selectors';
import { OfferCardComponent } from '../../shared/offer-card/offer-card.component';

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, OfferCardComponent],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  private store = inject(Store<AppState>);

  public offers = this.store.selectSignal(selectOffersByCity);
}
