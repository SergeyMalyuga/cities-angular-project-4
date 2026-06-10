import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Offer, OfferPreview} from '../../core/models/offers';
import {Comment} from '../../core/models/comments';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, combineLatest, EMPTY, filter, map, of, switchMap} from 'rxjs';
import {OfferDataService} from '../../core/services/offer-data.service';
import {AppRoute} from '../../core/constants/const';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SlicePipe, TitleCasePipe} from '@angular/common';
import {MapComponent} from '../../shared/components/map/map.component';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';

@Component({
  selector: 'app-offer',
  imports: [HeaderComponent, TitleCasePipe, MapComponent, OfferCardComponent, SlicePipe],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private offerService = inject(OfferDataService);
  private destroyRef = inject(DestroyRef);

  public offer = signal<Offer | null>(null);
  public comments = signal<Comment[]>([]);
  public nearbyOffers = signal<OfferPreview[]>([]);
  public offerId = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.pipe(map(params => params.get('id')),
      filter((id): id is string => id !== null),
      switchMap(id => {
        const offer$ = this.offerService.getOfferById(id).pipe(
          catchError(() => {
            this.router.navigate([AppRoute.MAIN]);
            return EMPTY
          }));

        const nearbyOffers$ = this.offerService.getNearbyOffers(id).pipe(
          catchError(() => {
            return of([])
          }));

        return combineLatest({
          offer: offer$,
          nearbyOffers: nearbyOffers$
        })
      }), takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.offer.set(result.offer);
        this.offerId.set(result.offer.id);
        this.nearbyOffers.set(result.nearbyOffers);
      });
  }

  protected readonly Math = Math;
}
