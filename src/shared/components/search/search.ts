import { Component, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matSearch } from '@ng-icons/material-icons/baseline';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [NgIcon, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  viewProviders: [provideIcons({ matSearch })],
})
export class Search {
  public placeholder = input('');
  public searchEvent = output<string>();
  public surname = '';

  public search(): void {
    this.searchEvent.emit(this.surname);
  }
}
