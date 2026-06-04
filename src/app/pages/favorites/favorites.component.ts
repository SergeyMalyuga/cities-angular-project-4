import { ChangeDetectionStrategy, Component } from '@angular/core';
import {HeaderComponent} from '../../shared/header/header.component';

@Component({
  selector: 'app-favorites',
  imports: [
    HeaderComponent
  ],
  templateUrl: './favorites.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesComponent {

}
