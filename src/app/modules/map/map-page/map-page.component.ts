import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeStyle } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { Pin, PoiPinsQueryRequestDto } from '@petman/common';

import * as fromMap from '@map/reducers';
import * as fromPoi from '@poi/reducers';
import { PoiService } from '@poi/poi.service';
import { Pins } from '@poi/actions/poi.actions';
import { GoogleMapComponent } from '@shared/components/google-map/google-map.component';
import { Config } from '@shared/components/card/card.component';
import { MasonryComponent } from '@shared/components/masonry/masonry.component';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPageComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMapComponent) map: GoogleMapComponent;
  @ViewChild(MasonryComponent) masonry: MasonryComponent;
  selectedPrimaryCategories: number[] = [];
  masonryOptions = {
    trueOrder: false,
    mobileFirst: true,
    columns: 1,
    margin: 24,
    breakAt: {
      940: 3,
      520: 2,
      400: 1
    }
  };
  pins: Pin[];
  pins$ = this.store.select(fromPoi.getPinAll);
  primaryCategories$ = this.store.select(fromPoi.getCategoryAll);
  error$ = this.store.select(fromMap.getMapPageError);
  pending$ = this.store.select(fromMap.getMapPagePending);
  private subscriptions: Subscription[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
    private store: Store<fromMap.State>
  ) {
    const pinsSubscription = this.pins$.subscribe(
      pins => (this.pins = pins.map(pin => PoiService.createMapPin(pin)))
    );

    this.subscriptions.push(...[pinsSubscription]);
  }

  get filterInlineStyle(): SafeStyle {
    const css = this.selectedPrimaryCategories.length
      ? 'padding-top: 10px !important'
      : '';

    return this.sanitizer.bypassSecurityTrustStyle(css);
  }

  private get pinsRequest(): PoiPinsQueryRequestDto {
    return {
      offset: 0,
      limit: 100,
      primaryCategories: this.selectedPrimaryCategories
    };
  }

  ngOnInit() {
    this.store.dispatch(new Pins(this.pinsRequest));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getMapGridCardConfig(pin: Pin): Config {
    return {
      title: pin.title,
      avatar: pin.meta.avatar,
      subtitle: this.translateService.instant(pin.meta.primaryCategory.label),
      content: `${pin.meta.address.fullAddress().replace(/\s+/g, ' ')}`
    };
  }

  updateList() {
    this.store.dispatch(new Pins(this.pinsRequest));
  }

  panTo(pin: Pin) {
    if (this.map) {
      this.map.panToPin(pin);
    }
  }
}
