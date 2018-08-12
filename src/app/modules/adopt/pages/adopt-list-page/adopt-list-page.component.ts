import pickBy from 'lodash-es/pickBy';
import identity from 'lodash-es/identity';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { AdoptListQueryRequestDto, ModalSize, AdoptDto, Gender, PetType, PetSize, PetAge } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromAdopt from '@adopt/reducers';
import { environment } from '@environments/environment';
import { Config } from '@shared/components/card/card.component';
import { List, More } from '@adopt/actions/adopt.actions';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { LayoutActionTypes } from '@app/actions/layout.actions';

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
  filter: FormGroup;
  PetType = PetType;
  Gender = Gender;
  PetAge = PetAge;
  PetSize = PetSize;
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
  list$ = this.store.select(fromAdopt.getAll);
  total$ = this.store.select(fromAdopt.getTotal);
  showLoader$ = this.store.select(fromAdopt.getListShowLoader);
  error$ = this.store.select(fromAdopt.getAdoptListPageError);
  pending$ = this.store.select(fromAdopt.getAdoptListPagePending);
  selectedUser$ = this.store.select(fromAuth.getSelectedUser);
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<fromAdopt.State>,
    private actions$: Actions,
    private translateService: TranslateService,
    private datePipe: DatePipe,
    @Inject(FormBuilder) private formBuilder: FormBuilder
  ) {
    const totalSubscription = this.total$.subscribe(total => (this.total = total));

    this.filter = this.formBuilder.group({
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

  private get listRequest(): AdoptListQueryRequestDto {
    return {
      offset: this.offset,
      limit: this.limit,
      ...pickBy<AdoptListQueryRequestDto>(this.filter.value, identity)
    };
  }

  ngOnInit() {
    this.store.dispatch(new List(this.listRequest));
  }

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
    const url = environment.origin + this.router.createUrlTree(['adoption', adopt.id]).toString();
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    dialogRef.afterClosed().subscribe(shareOptions => {});
  }
}
