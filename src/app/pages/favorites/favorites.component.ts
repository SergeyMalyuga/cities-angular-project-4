import {ChangeDetectionStrategy, Component, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {SortedFavoriteOffers} from '../../core/models/sorted-favorite-offers';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {
  selectFavoriteOffers,
  selectFavoriteOffersTotal
} from '../../store/favorite-offer/selectors/favorite-offer.selectors';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [HeaderComponent, OfferCardComponent, TitleCasePipe],
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  private store = inject(Store<AppState>);

  public sortedFavoriteOffers = signal<SortedFavoriteOffers>(this.getSortedOffers());
  public offersTotal = this.store.selectSignal(selectFavoriteOffersTotal);

  ngOnInit(): void {
    this.store.select(selectFavoriteOffers).pipe().subscribe(favoriteOffers => {
      const sortedOffers = this.getSortedOffers();
      favoriteOffers.forEach(offer => {
        const key = offer.city.name.toLowerCase();
        if (this.isSortedOffer(key)) {
          sortedOffers[key].push(offer);
        }
      });
      this.sortedFavoriteOffers.set(sortedOffers);
    })
  }

  public isSortedOffer(offer: string): offer is keyof SortedFavoriteOffers {
    return offer in this.sortedFavoriteOffers()
  }

  private getSortedOffers(): SortedFavoriteOffers {
    return {
      paris: [],
      cologne: [],
      brussels: [],
      amsterdam: [],
      hamburg: [],
      dusseldorf: []
    }
  }

  protected readonly Object = Object;
}
