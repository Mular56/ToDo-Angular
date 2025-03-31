import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Output() filterChanged = new EventEmitter<string>();
  activeFilter: string = 'all'; // Початкове значення

  onFilterChange(filter: string) {
    this.activeFilter = filter;
    this.filterChanged.emit(filter);
  }
}
