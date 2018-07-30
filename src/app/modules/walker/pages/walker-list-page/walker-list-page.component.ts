import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { ListQueryRequestDto, ModalSize, WalkerDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromWalker from '@walker/reducers';
import { environment } from '@environments/environment';
import { Config } from '@shared/components/card/card.component';
import { List, More } from '@walker/actions/walker.actions';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';

@Component({
  selector: 'app-walker-list-page',
  templateUrl: './walker-list-page.component.html',
  styleUrls: ['./walker-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalkerListPageComponent implements OnInit, OnDestroy {
  list: WalkerDto[];
  limit = 12;
  total: number;
  offset = 0;
  masonryOptions = {
    mobileFirst: true,
    columns: 1,
    margin: 24,
    breakAt: {
      1680: 4,
      940: 3,
      520: 2,
      400: 1
    }
  };
  list$ = this.store.select(fromWalker.getAll);
  total$ = this.store.select(fromWalker.getTotal);
  isListLoaded$ = this.store.select(fromWalker.getIsListLoaded);
  error$ = this.store.select(fromWalker.getWalkerListPageError);
  pending$ = this.store.select(fromWalker.getWalkerListPagePending);
  selectedUser$ = this.store.select(fromAuth.getSelectedUser);
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<fromWalker.State>,
    private translateService: TranslateService,
    private datePipe: DatePipe
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

  getCardConfig(item: WalkerDto): Config {
    return {
      avatar: item.user.userData.avatar,
      title: item.user.userData.name,
      subtitle: this.datePipe.transform(item.created),
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

  onShare(walker: WalkerDto) {
    const url =
      environment.origin +
      this.router.createUrlTree(['walkers', walker.id]).toString();
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    dialogRef.afterClosed().subscribe(shareOptions => {});
  }
}
