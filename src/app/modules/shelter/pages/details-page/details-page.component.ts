import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromShelter from '@shelter/reducers';

@Component({
  selector: 'app-shelter-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsPageComponent implements OnInit {

  constructor(private store: Store<fromShelter.State>) {
  }

  ngOnInit() {
  }
}
