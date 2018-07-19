import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeStyle } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { MatButtonToggleGroup } from '@angular/material';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

import {
  Pin,
  PoiDto,
  PoiListQueryRequestDto,
  PoiPinsQueryRequestDto
} from '@petman/common';

import * as fromMap from '@map/reducers';
import * as fromPoi from '@poi/reducers';
import { PoiService } from '@poi/poi.service';
import { List, More, Pins, PoiActionTypes } from '@poi/actions/poi.actions';
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
  @ViewChild(PerfectScrollbarDirective)
  perfectScrollbar: PerfectScrollbarDirective;
  @ViewChild('group') group: MatButtonToggleGroup;
  list: PoiDto[];
  limit = 12;
  total: number;
  offset = 0;
  selectedPrimaryCategories: number[] = [];
  masonryOptions = {
    trueOrder: false,
    mobileFirst: true,
    columns: 1,
    margin: 24,
    breakAt: {
      940: 4,
      520: 2,
      400: 1
    }
  };
  pins: Pin[];
  list$ = this.store.select(fromPoi.getAll);
  total$ = this.store.select(fromPoi.getTotal);
  pins$ = this.store.select(fromPoi.getPinAll);
  primaryCategories$ = this.store.select(fromPoi.getCategoryAll);
  error$ = this.store.select(fromMap.getMapPageError);
  pending$ = this.store.select(fromMap.getMapPagePending);
  private subscriptions: Subscription[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
    private store: Store<fromMap.State>,
    private actions$: Actions
  ) {
    const listSubscription = this.list$.subscribe(list => {
      this.list = list;
      this.offset = Math.max(0, this.list.length - this.limit);
    });
    const totalSubscription = this.total$.subscribe(
      total => (this.total = total)
    );

    const pinsSubscription = this.pins$.subscribe(
      pins => (this.pins = pins.map(pin => PoiService.createMapPin(pin)))
    );

    this.subscriptions.push(
      ...[listSubscription, totalSubscription, pinsSubscription]
    );
  }

  get canLoadMore(): boolean {
    return this.offset + this.limit < this.total;
  }

  get filterInlineStyle(): SafeStyle {
    const css = this.selectedPrimaryCategories.length
      ? 'padding-top: 10px !important'
      : '';

    return this.sanitizer.bypassSecurityTrustStyle(css);
  }

  private get listRequest(): PoiListQueryRequestDto {
    return {
      offset: this.offset,
      limit: this.limit,
      primaryCategories: this.selectedPrimaryCategories
    };
  }

  private get pinsRequest(): PoiPinsQueryRequestDto {
    return {
      offset: 0,
      limit: 100,
      primaryCategories: this.selectedPrimaryCategories
    };
  }

  ngOnInit() {
    this.store.dispatch(new List(this.listRequest));
    this.store.dispatch(new Pins(this.pinsRequest));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCardConfig(poi: PoiDto): Config {
    return {
      title: poi.name,
      avatar: poi.avatar,
      subtitle: this.translateService.instant(poi.primaryCategory.label),
      image: poi.images && poi.images[0],
      content: `${poi.description ||
        ''} <br> ${poi.address.fullAddress().replace(/\s+/g, ' ')}`,
      actions: {
        tooltipText: this.translateService.instant('SHOW_ON_MAP'),
        color: 'accent',
        icon: 'location_on'
      }
    };
  }

  getMapGridCardConfig(pin: Pin): Config {
    return {
      title: pin.title,
      avatar: pin.meta.avatar,
      subtitle: this.translateService.instant(pin.meta.primaryCategory.label),
      content: `${pin.meta.address.fullAddress().replace(/\s+/g, ' ')}`
    };
  }

  getMapGridId(pin: Pin): string {
    return `map-grid-${pin.meta.id}`;
  }

  onLoadMore() {
    if (this.canLoadMore) {
      this.offset += this.limit;
      this.store.dispatch(new More(this.listRequest));
    }
  }

  updateList() {
    this.offset = 0;
    this.limit = 12;
    this.store.dispatch(new List(this.listRequest));
    this.store.dispatch(new Pins(this.pinsRequest));

    this.actions$
      .ofType(PoiActionTypes.LIST_SUCCESS, PoiActionTypes.LIST_FAILURE)
      .pipe(
        take(1),
        delay(MasonryComponent.WAIT_TIMEOUT),
        tap(() => {
          if (this.masonry && this.masonry.instance) {
            this.masonry.instance.recalculate(true);
          }
        }),
      ).subscribe();
  }

  panTo(pin: Pin) {
    if (this.map) {
      this.map.panToPin(pin);
    }
  }

  showOnMap(poi: PoiDto) {
    if (this.group) {
      this.group.value = 'map';
      setTimeout(() => {
        const pin = PoiService.createMapPin(poi);
        this.panTo(pin);
        this.scrollToCard(pin);
      }, 500);
    }
  }

  scrollToCard(pin: Pin) {
    if (this.perfectScrollbar) {
      this.perfectScrollbar.scrollToElement(
        `#${this.getMapGridId(pin)}`,
        null,
        300
      );
    }
  }
}
