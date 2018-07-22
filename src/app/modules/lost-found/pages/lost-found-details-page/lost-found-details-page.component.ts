import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MetaService } from '@ngx-meta/core';
import { StripTagsPipe } from 'ngx-pipes';

import { ModalSize, LostFoundDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromLostFound from '@lost-found/reducers';
import { environment } from '@environments/environment';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';
import { SlideConfig } from '@material/components/mz-slider/mz-slider.component';
import { Select } from '@lost-found/actions/lost-found.actions';

@Component({
  selector: 'app-lost-found-details-page',
  templateUrl: './lost-found-details-page.component.html',
  styleUrls: ['./lost-found-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LostFoundDetailsPageComponent implements OnInit, OnDestroy {
  url: string;
  slides: SlideConfig[] = [];
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
    private stripTagsPipe: StripTagsPipe,
    @Inject(DOCUMENT) private document: Document
  ) {
    const paramsSubscription = this.route.params
      .pipe(map(params => new Select(params.id)))
      .subscribe(store);

    this.url = this.router.url;

    const lostFoundSubscription = this.lostFound$.subscribe(lostFound => {
      this.lostFound = lostFound;

      if (this.lostFound) {
        this.slides = this.lostFound.images.map(img => ({ src: img }));

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
    const url = this.document.location.origin + this.url;
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    dialogRef.afterClosed().subscribe(shareOptions => {});
  }
}
