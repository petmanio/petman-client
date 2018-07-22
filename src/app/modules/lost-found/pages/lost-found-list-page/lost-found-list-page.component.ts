import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { ListQueryRequestDto, ModalSize, LostFoundDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromLostFound from '@lost-found/reducers';
import { Config } from '@shared/components/card/card.component';
import { List, More } from '@lost-found/actions/lost-found.actions';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';

@Component({
  selector: 'app-lost-found-list-page',
  templateUrl: './lost-found-list-page.component.html',
  styleUrls: ['./lost-found-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LostFoundListPageComponent implements OnInit, OnDestroy {
  list: LostFoundDto[];
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
  list$ = this.store.select(fromLostFound.getAll);
  total$ = this.store.select(fromLostFound.getTotal);
  isListLoaded$ = this.store.select(fromLostFound.getIsListLoaded);
  error$ = this.store.select(fromLostFound.getLostFoundListPageError);
  pending$ = this.store.select(fromLostFound.getLostFoundListPagePending);
  selectedUser$ = this.store.select(fromAuth.getSelectedUser);
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<fromLostFound.State>,
    private translateService: TranslateService,
    private datePipe: DatePipe,
    @Inject(DOCUMENT) private document: Document
  ) {
    const listSubscription = this.list$.subscribe(list => {
      this.list = list;
      this.offset = Math.max(0, this.list.length - this.limit);
    });
    const totalSubscription = this.total$.subscribe(
      total => (this.total = total)
    );

    this.isListLoaded$
      .pipe(
        takeWhile(loaded => !loaded),
        tap(() => this.store.dispatch(new List(this.listRequest)))
      )
      .subscribe();

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

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getCardConfig(item: LostFoundDto): Config {
    return {
      avatar: item.user.userData.avatar,
      title: item.user.userData.name,
      subtitle: `<span class="has-text-warning">${this.translateService.instant(
        item.type
      )}</span> ${this.datePipe.transform(item.created)}`,
      image: item.images && item.images[0],
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

  onShare(lostFound: LostFoundDto) {
    const url =
      this.document.location.origin +
      this.router.createUrlTree(['lost-found', lostFound.id]).toString();
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    dialogRef.afterClosed().subscribe(shareOptions => {});
  }
}
