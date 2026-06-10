import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoriteOfferDataService } from '../../../core/services/favorite-offer-data.service';
import * as FavoriteOfferActions from '../actions/favorite-offer.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoriteOfferEffects {
  private actions$ = inject(Actions);
  private favoriteOfferService = inject(FavoriteOfferDataService);

  public loadFavoriteOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteOfferActions.loadFavoriteOffers),
      switchMap(() =>
        this.favoriteOfferService.getOffers().pipe(
          map((favoriteOffers) =>
            FavoriteOfferActions.loadFavoriteOffersSuccess({ favoriteOffers }),
          ),
          catchError((error: HttpErrorResponse) =>
            of(FavoriteOfferActions.loadFavoriteOffersFailure({ error })),
          ),
        ),
      ),
    ),
  );
}
