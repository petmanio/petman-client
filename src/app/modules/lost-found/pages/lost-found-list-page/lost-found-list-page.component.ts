import pickBy from 'lodash-es/pickBy';
import identity from 'lodash-es/identity';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';

import {
  Gender,
  LostFoundDto,
  LostFoundListQueryRequestDto,
  LostFoundType,
  ModalSize,
  PetAge,
  PetSize,
  PetType
} from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromLostFound from '@lost-found/reducers';
import { environment } from '@environments/environment';
import { LayoutActionTypes } from '@app/actions/layout.actions';
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
  filter: FormGroup;
  PetType = PetType;
  Gender = Gender;
  PetAge = PetAge;
  PetSize = PetSize;
  LostFoundType = LostFoundType;
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
  @ViewChild('mobileFilters')
  mobileFilters: TemplateRef<any>;
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
    private actions$: Actions,
    private translateService: TranslateService,
    private datePipe: DatePipe,
    @Inject(FormBuilder) private formBuilder: FormBuilder
  ) {
    const totalSubscription = this.total$.subscribe(total => (this.total = total));

    this.filter = this.formBuilder.group({
      applicationType: [''],
      type: [''],
      gender: [''],
      age: [''],
      size: ['']
    });

    const filterSubscription = this.filter.valueChanges.subscribe(value => {
      this.limit = 12;
      this.offset = 0;
      this.store.dispatch(new List(this.listRequest));
    });

    this.store.dispatch(new List(this.listRequest));

    const openMobileFiltersSubscription = this.actions$
      .ofType(LayoutActionTypes.OPEN_MOBILE_FILTERS)
      .pipe(
        tap(() => {
          this.dialog.open(this.mobileFilters);
        })
      )
      .subscribe();

    this.subscriptions.push(...[totalSubscription, openMobileFiltersSubscription, filterSubscription]);
  }

  get canLoadMore(): boolean {
    return this.offset + this.limit < this.total;
  }

  private get listRequest(): LostFoundListQueryRequestDto {
    return {
      offset: this.offset,
      limit: this.limit,
      ...pickBy<LostFoundListQueryRequestDto>(this.filter.value, identity)
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
        item.applicationType
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
    const url = environment.origin + this.router.createUrlTree(['lost-found', lostFound.id]).toString();
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    dialogRef.afterClosed().subscribe(shareOptions => {});
  }
}
