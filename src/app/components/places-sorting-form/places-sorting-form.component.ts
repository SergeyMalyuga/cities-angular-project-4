import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {ToggleDirective} from '../../shared/directives/toggle.directive';
import {NgClass} from '@angular/common';
import {HoverTrackerDirective} from '../../shared/directives/hover-tracker.directive';

@Component({
  selector: 'app-places-sorting-form',
  imports: [
    ToggleDirective,
    NgClass,
    HoverTrackerDirective
  ],
  templateUrl: './places-sorting-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesSortingFormComponent {
  public isOptionsOpen = signal<boolean>(false);

  public toggleSortingOptions() {
    this.isOptionsOpen.set(!this.isOptionsOpen());
  }

  public closeSortingOptions(isHovered: boolean) {
    if (isHovered) return;
      this.isOptionsOpen.set(false);
  }
}
