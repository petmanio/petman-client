import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromShelter from '@shelter/reducers';

@Component({
  selector: 'app-shelter-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPageComponent implements OnInit {
  pending$ = this.store.select(fromShelter.getAddPagePending);
  error$ = this.store.select(fromShelter.getAddPageError);

  constructor(private store: Store<fromShelter.State>) {
  }

  ngOnInit() {
  }
}
