import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MetaService } from '@ngx-meta/core';
import { StripTagsPipe } from 'ngx-pipes';

import { LostFoundDto, ModalSize } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromLostFound from '@lost-found/reducers';
import { environment } from '@environments/environment';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';
import { GALLERY_IMAGE } from 'ngx-image-gallery';
import { Select } from '@lost-found/actions/lost-found.actions';

@Component({
  selector: 'app-lost-found-details-page',
  templateUrl: './lost-found-details-page.component.html',
  styleUrls: ['./lost-found-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LostFoundDetailsPageComponent implements OnInit, OnDestroy {
  url: string;
  images: GALLERY_IMAGE[] = [];
  lostFound: LostFoundDto;
  lostFound$ = this.store.pipe(select(fromLostFound.getSelected));
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromLostFound.State>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private meta: MetaService,
    private stripTagsPipe: StripTagsPipe
  ) {
    const paramsSubscription = this.route.params
      .pipe(map(params => new Select(params.id)))
      .subscribe(store);

    this.url = this.router.url;

    const lostFoundSubscription = this.lostFound$.subscribe(lostFound => {
      this.lostFound = lostFound;

      if (this.lostFound) {
        this.images = this.lostFound.images.map(url => ({ url }));

        this.meta.setTag(
          'og:description',
          this.stripTagsPipe.transform(this.lostFound.description)
        );
        this.meta.setTag(
          'og:image',
          environment.origin + this.lostFound.images[0]
        );
      }
    });

    this.subscriptions.push(...[paramsSubscription, lostFoundSubscription]);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onShare() {
    const url = environment.origin + this.url;
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    dialogRef.afterClosed().subscribe(shareOptions => {});
  }
}
