import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, DOCUMENT, Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { ListQueryRequestDto, ModalSize, ShelterDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromShelter from '@shelter/reducers';
import { Config } from '@shared/components/card/card.component';
import { List, More } from '@shelter/actions/shelter.actions';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';

@Component({
  selector: 'app-shelter-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPageComponent implements OnInit, OnDestroy {
  list: ShelterDto[];
  limit = 12;
  total: number;
  offset = 0;
  list$ = this.store.select(fromShelter.getAllShelters);
  total$ = this.store.select(fromShelter.getTotalShelters);
  error$ = this.store.select(fromShelter.getListPageError);
  pending$ = this.store.select(fromShelter.getListPagePending);
  selectedUser$ = this.store.select(fromAuth.getSelectedUser);
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private store: Store<fromShelter.State>,
    private datePipe: DatePipe,
    @Inject(DOCUMENT) private document: Document
  ) {

    const listSubscription = this.list$.subscribe(list => {
      this.list = list;
      this.offset = Math.max(0, this.list.length - this.limit);
    });
    const totalSubscription = this.total$.subscribe(total => this.total = total);

    this.subscriptions.push(...[listSubscription, totalSubscription]);
  }

  get canLoadMore(): boolean {
    return this.offset + this.limit < this.total;
  }

  private get listRequest(): ListQueryRequestDto {
    return {
      limit: this.limit,
      offset: this.offset
    };
  }

  ngOnInit(): void {
    this.store.dispatch(new List(this.listRequest));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCardConfig(item: ShelterDto): Config {
    return {
      avatar: item.user.userData.avatar,
      title: item.user.userData.name,
      subtitle: this.datePipe.transform(item.created),
      image: item.images && item.images[0],
      price: item.price,
      contentHTML: item.description,
      actions: true
    };
  }

  onLoadMore(): void {
    if (this.canLoadMore) {
      this.offset += this.limit;
      this.store.dispatch(new More(this.listRequest));
    }
  }

  onShare(shelter: ShelterDto): void {
    const url = this.document.location.origin + this.router.createUrlTree(['shelters', shelter.id]).toString();
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    dialogRef.afterClosed().subscribe(shareOptions => {});
  }
}
