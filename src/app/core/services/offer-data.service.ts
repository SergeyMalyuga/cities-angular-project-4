import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Offer, OfferPreview} from '../models/offers';
import {APIRoute, BASE_URL} from '../constants/const';
import {defaultHttpPipes} from '../utils/rjxs-operators';

@Injectable({
  providedIn: 'root'
})
export class OfferDataService {
  private http = inject(HttpClient);

  public getOffers(): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/${APIRoute.OFFERS}`).pipe(...defaultHttpPipes<OfferPreview[]>());
  }

  public getOfferById(offerId: string): Observable<Offer> {
    return this.http.get<Offer>(`${BASE_URL}/${APIRoute.OFFERS}/${offerId}`).pipe(...defaultHttpPipes<Offer>());
  }

  public getNearbyOffers(offerId: string): Observable<OfferPreview[]> {
    return this.http.get<OfferPreview[]>(`${BASE_URL}/${APIRoute.OFFERS}/${offerId}/nearby`).pipe(...defaultHttpPipes<OfferPreview[]>());
  }
}
