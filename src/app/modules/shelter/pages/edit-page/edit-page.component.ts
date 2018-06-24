import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromShelter from '@shelter/reducers';

@Component({
  selector: 'app-shelter-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPageComponent implements OnInit {
  pending$ = this.store.select(fromShelter.getEditPagePending);
  error$ = this.store.select(fromShelter.getEditPageError);

  constructor(private store: Store<fromShelter.State>) {
  }

  ngOnInit() {
  }
}
