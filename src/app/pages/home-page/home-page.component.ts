import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Pin, PoiPinsQueryRequestDto } from '@petman/common';

import * as fromRoot from '@app/reducers';
import * as fromPoi from '@poi/reducers';
import { Pins } from '@poi/actions/poi.actions';
import { PoiService } from '@poi/poi.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  pins: Pin[];
  pins$ = this.store.select(fromPoi.getPinAll);
  private subscriptions: Subscription[] = [];

  constructor(private store: Store<fromRoot.State>) {
    const pinsSubscription = this.pins$.subscribe(pins => this.pins = pins.map(pin => PoiService.createMapPin(pin)));

    this.subscriptions.push(...[pinsSubscription]);
  }

  private get pinsRequest(): PoiPinsQueryRequestDto {
    return {
      offset: 0,
      limit: 100,
      primaryCategories: []
    };
  }

  ngOnInit() {
    this.store.dispatch(new Pins(this.pinsRequest));
  }

}
