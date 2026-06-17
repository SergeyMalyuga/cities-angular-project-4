import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import {select, Store} from '@ngrx/store';
import { AppState } from '../../core/models/app.state';
import {
  selectCurrentCity, selectIsOfferLoading,
  selectOffersByCity,
} from '../../store/app/selectors/app.selectors';
import { OfferCardComponent } from '../../shared/components/offer-card/offer-card.component';
import { CITY_LOCATIONS, SortType } from '../../core/constants/const';
import { NgClass } from '@angular/common';
import { City } from '../../core/models/city';
import { changeCity } from '../../store/city/actions/city.actions';
import { PlacesSortingFormComponent } from '../../components/places-sorting-form/places-sorting-form.component';
import { SortOfferByPipe } from './pipes/sort-offer-by.pipe';
import { OfferPreview } from '../../core/models/offers';
import { MapComponent } from '../../shared/components/map/map.component';
import {LoaderComponent} from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-main',
  imports: [
    HeaderComponent,
    OfferCardComponent,
    NgClass,
    PlacesSortingFormComponent,
    SortOfferByPipe,
    MapComponent,
    LoaderComponent,
  ],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  private store = inject(Store<AppState>);
  protected readonly CITY_LOCATIONS = CITY_LOCATIONS;

  public offers = this.store.selectSignal(selectOffersByCity);
  public isOfferLoading = this.store.selectSignal(selectIsOfferLoading);
  public currentCity = this.store.selectSignal(selectCurrentCity);
  public sortType = signal<SortType>(SortType.POPULAR);
  public activeCard = signal<OfferPreview | null>(null);

  public changeCity(city: City) {
    this.store.dispatch(changeCity({ city }));
  }

  public changeSortType(sortType: SortType) {
    this.sortType.set(sortType);
  }

  public changeActiveCard(offer: OfferPreview | null) {
    this.activeCard.set(offer);
  }
}
