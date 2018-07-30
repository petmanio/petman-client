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

import { ListQueryRequestDto, ModalSize, SitterDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromSitter from '@sitter/reducers';
import { environment } from '@environments/environment';
import { Config } from '@shared/components/card/card.component';
import { List, More } from '@sitter/actions/sitter.actions';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';

@Component({
  selector: 'app-sitter-list-page',
  templateUrl: './sitter-list-page.component.html',
  styleUrls: ['./sitter-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SitterListPageComponent implements OnInit, OnDestroy {
  list: SitterDto[];
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
  list$ = this.store.select(fromSitter.getAll);
  total$ = this.store.select(fromSitter.getTotal);
  isListLoaded$ = this.store.select(fromSitter.getIsListLoaded);
  error$ = this.store.select(fromSitter.getSitterListPageError);
  pending$ = this.store.select(fromSitter.getSitterListPagePending);
  selectedUser$ = this.store.select(fromAuth.getSelectedUser);
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<fromSitter.State>,
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

  getCardConfig(item: SitterDto): Config {
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

  onShare(sitter: SitterDto) {
    const url =
      environment.origin +
      this.router.createUrlTree(['sitters', sitter.id]).toString();
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    dialogRef.afterClosed().subscribe(shareOptions => {});
  }
}
