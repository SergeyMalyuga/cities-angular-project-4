import {Component, DestroyRef, EventEmitter, inject, Input, Output} from '@angular/core';
import {OfferPreview} from '../../../core/models/offers';
import {NgClass, TitleCasePipe} from '@angular/common';
import {HoverTrackerDirective} from '../../directives/hover-tracker.directive';
import {RouterLink} from '@angular/router';
import {AppRoute, AuthorizationStatus} from '../../../core/constants/const';
import {OfferService} from '../../../core/services/offer.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../core/models/app.state';
import {selectIsFavoriteOffersLoading} from '../../../store/favorite-offer/selectors/favorite-offer.selectors';
import {selectAuthStatus} from '../../../store/user/selectors/user.selectors';
import {first, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  imports: [TitleCasePipe, HoverTrackerDirective, RouterLink, NgClass],
})
export class OfferCardComponent {
  @Input({required: true}) offer!: OfferPreview;
  @Output() hovered = new EventEmitter<OfferPreview | null>();
  @Output() toggled = new EventEmitter<void>();

  private offerService = inject(OfferService);
  private store = inject(Store<AppState>);
  private destroyRef = inject(DestroyRef);

  protected readonly Math = Math;
  protected readonly AppRoute = AppRoute;

  public isFavoriteOffersLoading = this.store.selectSignal(selectIsFavoriteOffersLoading);
  public authStatus = this.store.selectSignal(selectAuthStatus);

  public onHovered(isHovered: boolean) {
    if (isHovered) {
      this.hovered.emit(this.offer);
    } else {
      this.hovered.emit(null);
    }
  }

  public toggleFavoriteOffer() {
    this.offerService.toggleFavorite(this.offer.id, !this.offer.isFavorite)
      .pipe(first(success => success !== null),
        takeUntilDestroyed(this.destroyRef),
        tap((success) => {
          if (success) {
            this.toggled.emit()
          }
        })).subscribe();
  }

  protected readonly AuthorizationStatus = AuthorizationStatus;
}
