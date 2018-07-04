import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';

import { BranchDto, OrganizationDto, OrganizationListQueryRequestDto, OrganizationPinsQueryRequestDto, Pin, PinDto } from '@petman/common';

import * as fromShared from '@shared/reducers';
import * as fromMap from '@map/reducers';
import * as fromOrganization from '@organization/reducers';
import { List, More, OrganizationActionTypes, Pins } from '@organization/actions/organization.actions';
import { GoogleMapComponent } from '@shared/components/google-map/google-map.component';
import { Config } from '@shared/components/card/card.component';
import { MasonryComponent } from '@shared/components/masonry/masonry.component';

@Component({
  selector: 'app-map-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMapComponent) map: GoogleMapComponent;
  @ViewChild(MasonryComponent) masonry: MasonryComponent;
  list: OrganizationDto[];
  limit = 12;
  total: number;
  offset = 0;
  masonryOptions = {
    trueOrder: false,
    waitForImages: true,
    useOwnImageLoader: false,
    mobileFirst: true,
    onInit: true,
    columns: 1,
    margin: 24,
    breakAt: {
      940: 3,
      520: 2,
      400: 1
    }
  };
  selectedServices: number[];
  pins: Pin[];
  list$ = this.store.select(fromOrganization.getAll);
  total$ = this.store.select(fromOrganization.getTotal);
  pins$ = this.store.select(fromOrganization.getPinAll);
  services$ = this.store.select(fromShared.getServiceAll);
  error$ = this.store.select(fromMap.getListPageError);
  pending$ = this.store.select(fromMap.getListPagePending);
  private subscriptions: Subscription[] = [];

  constructor(private datePipe: DatePipe, private store: Store<fromMap.State>, private actions$: Actions) {
    const listSubscription = this.list$.subscribe(list => {
      this.list = list;
      this.offset = Math.max(0, this.list.length - this.limit);
    });
    const totalSubscription = this.total$.subscribe(total => this.total = total);

    const pinsSubscription = this.pins$.subscribe(pins => this.pins = pins.map(pin => ListPageComponent.createMapPin(pin)));

    this.subscriptions.push(...[listSubscription, totalSubscription, pinsSubscription]);
  }

  get canLoadMore(): boolean {
    return this.offset + this.limit < this.total;
  }

  private get listRequest(): OrganizationListQueryRequestDto {
    return {
      offset: this.offset,
      limit: this.limit,
      services: this.selectedServices
    };
  }

  private get pinsRequest(): OrganizationPinsQueryRequestDto {
    return {
      offset: 0,
      limit: 100,
      services: this.selectedServices
    };
  }

  private static createMapPin(entity: PinDto): Pin {
    return {
      lat: entity.address.point.x,
      lng: entity.address.point.y,
      title: entity.title,
      meta: entity,
      infoWindow: {
        contentFn: ListPageComponent.pinInfoWindowContentFn
      }
    };
  }

  private static pinInfoWindowContentFn(pin: Pin): string {
    return `
      ${pin.title} <br/>
      ${pin.meta.description || ''} <br/>
      ${pin.meta.address.fullAddress()}&nbsp;
    `;
  }

  ngOnInit() {
    this.store.dispatch(new List(this.listRequest));
    this.store.dispatch(new Pins(this.pinsRequest));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCardConfig(item: OrganizationDto | BranchDto): Config {
    return {
      title: item.title,
      subtitle: this.datePipe.transform(item.created),
      image: item.images && item.images[0],
      chips: item.services.map(service => ({ color: '', text: service.title })),
      content: item.description
    };
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

    // TODO: find better way for recalculating
    this.actions$
      .ofType(OrganizationActionTypes.LIST_SUCCESS, OrganizationActionTypes.LIST_FAILURE)
      .pipe(
        take(1),
        delay(300),
        tap(() => this.masonry.instance.recalculate(true)),
      ).subscribe();
  }

  panTo(org: BranchDto | OrganizationDto) {
    // const foundPin = find(this.pins, pin => {
    //   const type = org instanceof BranchDto ? OrganizationPinType.BRANCH
    //     : OrganizationPinType.ORGANIZATION;
    //   return pin.meta.type === type && pin.meta.id === org.id;
    // });
    //
    // if (foundPin) {
    //   this.map.panToPin(foundPin);
    // }
  }
}
