import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';

@Component({
  selector: 'app-offer',
  imports: [
    HeaderComponent
  ],
  templateUrl: './offer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferComponent {

}
