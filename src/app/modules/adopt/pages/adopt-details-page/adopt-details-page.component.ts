import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MetaService } from '@ngx-meta/core';
import { StripTagsPipe } from 'ngx-pipes';
import { GALLERY_IMAGE } from 'ngx-image-gallery';

import { AdoptDto, ModalSize } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromAdopt from '@adopt/reducers';
import { environment } from '@environments/environment';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';
import { Select } from '@adopt/actions/adopt.actions';

@Component({
  selector: 'app-adopt-details-page',
  templateUrl: './adopt-details-page.component.html',
  styleUrls: ['./adopt-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdoptDetailsPageComponent implements OnInit, OnDestroy {
  url: string;
  images: GALLERY_IMAGE[] = [];
  adopt: AdoptDto;
  adopt$ = this.store.pipe(select(fromAdopt.getSelected));
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromAdopt.State>,
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

    const adoptSubscription = this.adopt$.subscribe(adopt => {
      this.adopt = adopt;

      if (this.adopt) {
        this.images = this.adopt.images.map(url => ({ url }));

        this.meta.setTag(
          'og:description',
          this.stripTagsPipe.transform(this.adopt.description)
        );
        this.meta.setTag('og:image', environment.origin + this.adopt.images[0]);
      }
    });

    this.subscriptions.push(...[paramsSubscription, adoptSubscription]);
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
