import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
} from '@angular/core';
import { ToggleDirective } from '../../shared/directives/toggle.directive';
import { NgClass } from '@angular/common';
import { HoverTrackerDirective } from '../../shared/directives/hover-tracker.directive';
import { SortType } from '../../core/constants/const';
import { AccessibilityClickDirective } from '../../shared/directives/accessibility-click.directive';

@Component({
  selector: 'app-places-sorting-form',
  imports: [
    ToggleDirective,
    NgClass,
    HoverTrackerDirective,
    AccessibilityClickDirective,
  ],
  templateUrl: './places-sorting-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesSortingFormComponent {
  @Input({ required: true }) currentSortType!: SortType;
  @Output() clicked = new EventEmitter<SortType>();

  protected readonly SortType = SortType;
  protected readonly Object = Object;

  public isOptionsOpen = signal<boolean>(false);

  public toggleSortingOptions() {
    this.isOptionsOpen.set(!this.isOptionsOpen());
  }

  public closeSortingOptions(isHovered: boolean) {
    if (isHovered) return;
    this.isOptionsOpen.set(false);
  }

  public onClicked(sortType: SortType) {
    this.clicked.emit(sortType);
  }
}
