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

import { ModalSize, UserDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromUser from '@user/reducers';
import { environment } from '@environments/environment';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';
import { SlideConfig } from '@material/components/mz-slider/mz-slider.component';
import { Select } from '@user/actions/user.actions';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsPageComponent implements OnInit, OnDestroy {
  url: string;
  slides: SlideConfig[] = [];
  user: UserDto;
  user$ = this.store.pipe(select(fromUser.getSelectedUser));
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromUser.State>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private meta: MetaService
  ) {
    const paramsSubscription = this.route.params
      .pipe(map(params => new Select(params.id)))
      .subscribe(store);

    this.url = this.router.url;

    const userSubscription = this.user$.subscribe(user => {
      this.user = user;

      if (this.user) {
        this.meta.setTag('og:description', this.user.userData.name);
        this.meta.setTag(
          'og:image',
          environment.origin + this.user.userData.avatar
        );
      }
    });

    this.subscriptions.push(...[paramsSubscription, userSubscription]);
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
