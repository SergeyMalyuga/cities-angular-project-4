import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal,} from '@angular/core';
import {HeaderComponent} from '../../shared/components/header/header.component';
import {Offer, OfferPreview} from '../../core/models/offers';
import {Comment} from '../../core/models/comments';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, combineLatest, EMPTY, filter, map, merge, of, Subject, switchMap,} from 'rxjs';
import {OfferDataService} from '../../core/services/offer-data.service';
import {AppRoute, AuthorizationStatus} from '../../core/constants/const';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DatePipe, SlicePipe, TitleCasePipe} from '@angular/common';
import {MapComponent} from '../../shared/components/map/map.component';
import {OfferCardComponent} from '../../shared/components/offer-card/offer-card.component';
import {CommentService} from '../../core/services/comment.service';
import {CommentFormComponent} from '../../components/comment-form/comment-form.component';
import {SortByDatePipe} from './pipes/sort-by-date.pipe';
import {Store} from '@ngrx/store';
import {AppState} from '../../core/models/app.state';
import {selectAuthStatus} from '../../store/user/selectors/user.selectors';

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
  ],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private offerService = inject(OfferDataService);
  private commentService = inject(CommentService);
  private destroyRef = inject(DestroyRef);
  private refreshComments$ = new Subject<void>();
  private store = inject(Store<AppState>);

  protected readonly Math = Math;

  public offer = signal<Offer | null>(null);
  public comments = signal<Comment[]>([]);
  public nearbyOffers = signal<OfferPreview[]>([]);
  public offerId = signal<string | null>(null);
  public authStatus = this.store.selectSignal(selectAuthStatus);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        filter((id): id is string => id !== null),
        switchMap((id) => {
          const offer$ = this.offerService.getOfferById(id).pipe(
            catchError(() => {
              this.router.navigate([AppRoute.MAIN]);
              return EMPTY;
            }),
          );

          const nearbyOffers$ = this.offerService.getNearbyOffers(id).pipe(
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

  protected readonly AuthorizationStatus = AuthorizationStatus;
}
