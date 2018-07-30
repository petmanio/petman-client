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

import { ListQueryRequestDto, ModalSize, AdoptDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromAdopt from '@adopt/reducers';
import { environment } from '@environments/environment';
import { Config } from '@shared/components/card/card.component';
import { List, More } from '@adopt/actions/adopt.actions';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';

@Component({
  selector: 'app-adopt-list-page',
  templateUrl: './adopt-list-page.component.html',
  styleUrls: ['./adopt-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdoptListPageComponent implements OnInit, OnDestroy {
  list: AdoptDto[];
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
  list$ = this.store.select(fromAdopt.getAll);
  total$ = this.store.select(fromAdopt.getTotal);
  isListLoaded$ = this.store.select(fromAdopt.getIsListLoaded);
  error$ = this.store.select(fromAdopt.getAdoptListPageError);
  pending$ = this.store.select(fromAdopt.getAdoptListPagePending);
  selectedUser$ = this.store.select(fromAuth.getSelectedUser);
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<fromAdopt.State>,
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

  getCardConfig(item: AdoptDto): Config {
    return {
      avatar: item.user.userData.avatar,
      title: item.user.userData.name,
      subtitle: this.datePipe.transform(item.created),
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

  onShare(adopt: AdoptDto) {
    const url =
      environment.origin +
      this.router.createUrlTree(['adoption', adopt.id]).toString();
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    dialogRef.afterClosed().subscribe(shareOptions => {});
  }
}
