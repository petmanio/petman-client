import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MetaService } from '@ngx-meta/core';
import { StripTagsPipe } from 'ngx-pipes';

import { ModalSize, WalkerDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromWalker from '@walker/reducers';
import { environment } from '@environments/environment';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';
import { Select } from '@walker/actions/walker.actions';

@Component({
  selector: 'app-walker-details-page',
  templateUrl: './walker-details-page.component.html',
  styleUrls: ['./walker-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalkerDetailsPageComponent implements OnInit, OnDestroy {
  url: string;
  walker: WalkerDto;
  walker$ = this.store.pipe(select(fromWalker.getSelected));
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromWalker.State>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private meta: MetaService,
    private stripTagsPipe: StripTagsPipe,
  ) {
    const paramsSubscription = this.route.params
      .pipe(map(params => new Select(params.id)))
      .subscribe(store);

    this.url = this.router.url;

    const walkerSubscription = this.walker$.subscribe(walker => {
      this.walker = walker;

      if (this.walker) {
        this.meta.setTag(
          'og:description',
          this.stripTagsPipe.transform(this.walker.description)
        );
      }
    });

    this.subscriptions.push(...[paramsSubscription, walkerSubscription]);
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
