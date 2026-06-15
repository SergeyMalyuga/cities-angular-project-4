import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal,} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Offer, OfferPreview} from '../../core/models/offers';
import {Comment} from '../../core/models/comments';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, combineLatest, EMPTY, filter, first, map, merge, of, Subject, switchMap, tap,} from 'rxjs';
import {OfferDataService} from '../../core/services/offer-data.service';
import {AppRoute, AuthorizationStatus} from '../../core/constants/const';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DatePipe, NgClass, SlicePipe, TitleCasePipe} from '@angular/common';
import {MapComponent} from '../../shared/components/map/map.component';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {CommentService} from '../../core/services/comment.service';
import {CommentFormComponent} from '../../components/comment-form/comment-form.component';
import {SortByDatePipe} from './pipes/sort-by-date.pipe';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';
import {OfferService} from '../../core/services/offer.service';
import {selectIsFavoriteOffersLoading} from '../../store/favorite-offer/selectors/favorite-offer.selectors';

@Component({
  selector: 'app-offer',
  imports: [
    HeaderComponent,
    TitleCasePipe,
    MapComponent,
    OfferCardComponent,
    SlicePipe,
    DatePipe,
    CommentFormComponent,
    SortByDatePipe,
    NgClass,
  ],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private offerDataService = inject(OfferDataService);
  private offerService = inject(OfferService);
  private commentService = inject(CommentService);
  private destroyRef = inject(DestroyRef);
  private refreshComments$ = new Subject<void>();
  private refreshOffer$ = new Subject<void>();
  private store = inject(Store<AppState>);

  protected readonly Math = Math;
  protected readonly AuthorizationStatus = AuthorizationStatus;

  public offer = signal<Offer | null>(null);
  public comments = signal<Comment[]>([]);
  public nearbyOffers = signal<OfferPreview[]>([]);
  public offerId = signal<string | null>(null);
  public authStatus = this.store.selectSignal(selectAuthStatus);
  public isFavoriteOfferLoading = this.store.selectSignal(selectIsFavoriteOffersLoading);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((id): id is string => id !== null),
        switchMap((id) => {
          const offer$ = merge(
            this.offerDataService.getOfferById(id),
            this.refreshOffer$.pipe(switchMap(() =>
                this.offerDataService.getOfferById(id)),
              catchError(() => {
                this.router.navigate([AppRoute.MAIN]);
                return EMPTY;
              }),
            ));

          const nearbyOffers$ = this.offerDataService.getNearbyOffers(id).pipe(
            catchError(() => {
              return of([]);
            }),
          );

          const comments$ = merge(
            this.commentService.getComments(id),
            this.refreshComments$.pipe(
              switchMap(() => this.commentService.getComments(id)),
              catchError(() => of([]))
            )
          )


          return combineLatest({
            offer: offer$,
            nearbyOffers: nearbyOffers$,
            comments: comments$,
          });
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((result) => {
        this.offer.set(result.offer);
        this.offerId.set(result.offer.id);
        this.nearbyOffers.set(result.nearbyOffers);
        this.comments.set(result.comments)
      });
  }

  public refreshComments() {
    this.refreshComments$.next();
  }

  public toggleFavoriteOffer() {
    const offer = this.offer();
    if (offer) {
      this.offerService.toggleFavorite(offer.id, !offer.isFavorite)
        .pipe(first(success => success !== null), tap((success) => {
          if (success) {
            this.refreshOffer$.next();
          }
        })).subscribe();
    }
  }
}
