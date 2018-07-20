import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { ListQueryRequestDto, ModalSize, ShelterDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromShelter from '@shelter/reducers';
import { Config } from '@shared/components/card/card.component';
import { List, More } from '@shelter/actions/shelter.actions';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';

@Component({
  selector: 'app-shelter-list-page',
  templateUrl: './shelter-list-page.component.html',
  styleUrls: ['./shelter-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShelterListPageComponent implements OnInit, OnDestroy {
  list: ShelterDto[];
  limit = 12;
  total: number;
  offset = 0;
  masonryOptions = {
    mobileFirst: true,
    columns: 1,
    margin: 24,
    breakAt: {
      940: 4,
      520: 2,
      400: 1
    }
  };
  list$ = this.store.select(fromShelter.getAll);
  total$ = this.store.select(fromShelter.getTotal);
  isListLoaded$ = this.store.select(fromShelter.getIsListLoaded);
  error$ = this.store.select(fromShelter.getShelterListPageError);
  pending$ = this.store.select(fromShelter.getShelterListPagePending);
  selectedUser$ = this.store.select(fromAuth.getSelectedUser);
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<fromShelter.State>,
    private translateService: TranslateService,
    private datePipe: DatePipe,
    @Inject(DOCUMENT) private document: Document
  ) {
    const listSubscription = this.list$.subscribe(list => {
      this.list = list;
      this.offset = Math.max(0, this.list.length - this.limit);
    });
    const totalSubscription = this.total$.subscribe(total => this.total = total);

    this.isListLoaded$.pipe(
      takeWhile(loaded => !loaded),
      tap(() => this.store.dispatch(new List(this.listRequest)))
    ).subscribe();

    this.subscriptions.push(...[listSubscription, totalSubscription]);
  }

  get canLoadMore(): boolean {
    return this.offset + this.limit < this.total;
  }

  private get listRequest(): ListQueryRequestDto {
    return {
      offset: this.offset,
      limit: this.limit
    };
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCardConfig(item: ShelterDto): Config {
    return {
      avatar: item.user.userData.avatar,
      title: item.user.userData.name,
      subtitle: this.datePipe.transform(item.created),
      image: item.images && item.images[0],
      price: item.price,
      content: item.description,
      actions: {
        color: 'accent',
        icon: 'share',
        tooltipText: this.translateService.instant('SHARE')
      }
    };
  }

  onLoadMore() {
    if (this.canLoadMore) {
      this.offset += this.limit;
      this.store.dispatch(new More(this.listRequest));
    }
  }

  onShare(shelter: ShelterDto) {
    const url = this.document.location.origin + this.router.createUrlTree(['shelters', shelter.id]).toString();
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    dialogRef.afterClosed().subscribe(shareOptions => {});
  }
}
