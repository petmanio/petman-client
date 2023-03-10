import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MetaService } from '@ngx-meta/core';
import { StripTagsPipe } from 'ngx-pipes';

import { ModalSize, SitterDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromSitter from '@sitter/reducers';
import { environment } from '@environments/environment';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';
import { GALLERY_IMAGE } from 'ngx-image-gallery';
import { Select } from '@sitter/actions/sitter.actions';

@Component({
  selector: 'app-sitter-details-page',
  templateUrl: './sitter-details-page.component.html',
  styleUrls: ['./sitter-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SitterDetailsPageComponent implements OnInit, OnDestroy {
  url: string;
  images: GALLERY_IMAGE[] = [];
  sitter: SitterDto;
  sitter$ = this.store.pipe(select(fromSitter.getSelected));
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromSitter.State>,
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

    const sitterSubscription = this.sitter$.subscribe(sitter => {
      this.sitter = sitter;

      if (this.sitter) {
        this.images = this.sitter.images.map(url => ({ url }));

        this.meta.setTag(
          'og:description',
          this.stripTagsPipe.transform(this.sitter.description)
        );
        this.meta.setTag(
          'og:image',
          environment.origin + this.sitter.images[0]
        );
      }
    });

    this.subscriptions.push(...[paramsSubscription, sitterSubscription]);
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
