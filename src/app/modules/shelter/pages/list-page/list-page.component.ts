import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromShelter from '@shelter/reducers';

@Component({
  selector: 'app-shelter-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit {
  pending$ = this.store.select(fromShelter.getListPagePending);
  error$ = this.store.select(fromShelter.getListPageError);

  constructor(private store: Store<fromShelter.State>) {
  }

  ngOnInit() {
  }
}
