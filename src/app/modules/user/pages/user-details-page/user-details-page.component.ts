import sample from 'lodash-es/sample';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { mergeMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MetaService } from '@ngx-meta/core';

import {
  ModalSize,
  UserDto,
  UserApplicationDto,
  UserApplicationType
} from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromUser from '@user/reducers';
import { environment } from '@environments/environment';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';
import { UserDetailsUpdateDialogComponent } from '@shared/components/user-details-update-dialog/user-details-update-dialog.component';
import { SlideConfig } from '@material/components/mz-slider/mz-slider.component';
import { Select, Update, Applications } from '@user/actions/user.actions';
import { Config } from '@shared/components/card/card.component';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsPageComponent implements OnInit, OnDestroy {
  url: string;
  slides: SlideConfig[] = [];
  userEntity: UserDto;
  randomCoverPhoto = sample([
    'dog-and-tennis-ball_dribbble.png',
    '3-dribbble-invites_dribbble.png',
    'cat-dribbble_03.png',
    'dog-and-tennis-ball_dribbble-2.png',
    'dribbble_playoff.png'
  ]);
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
  selectedUser: UserDto;
  selectedUser$ = this.store.pipe(select(fromAuth.getSelectedUser));
  userEntity$ = this.store.pipe(select(fromUser.getSelectedUser));
  applications$ = this.store.pipe(select(fromUser.getSelectedUserApplications));
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromUser.State>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private meta: MetaService,
    private translateService: TranslateService,
    private datePipe: DatePipe
  ) {
    const paramsSubscription = this.route.params
      .pipe(
        map(params => parseInt(params.id, 0)),
        mergeMap(userId => [new Select(userId), new Applications(userId)])
      )
      .subscribe(store);

    this.url = this.router.url;

    const userEntitySubscription = this.userEntity$.subscribe(user => {
      this.userEntity = user;

      if (this.userEntity) {
        this.meta.setTag('og:description', this.userEntity.userData.name);
        this.meta.setTag(
          'og:image',
          environment.origin + this.userEntity.userData.avatar
        );
      }
    });

    const selectedUserSubscription = this.selectedUser$.subscribe(
      selectedUser => (this.selectedUser = selectedUser)
    );

    this.subscriptions.push(
      ...[paramsSubscription, userEntitySubscription, selectedUserSubscription]
    );
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

  getApplicationLink(application): string[] {
    const applicationTypeUrlMap = {
      [UserApplicationType.SITTER]: ['/sitters', application.data.id],
      [UserApplicationType.WALKER]: ['/walkers', application.data.id],
      [UserApplicationType.LOST_FOUND]: ['/lost-found', application.data.id],
      [UserApplicationType.ADOPT]: ['/adoption', application.data.id]
    };

    return applicationTypeUrlMap[application.type];
  }

  getCardConfig(item: UserApplicationDto): Config {
    return {
      avatar: this.userEntity.userData.avatar,
      title:
        item.type === UserApplicationType.LOST_FOUND
          ? `<span class="has-text-warning">${this.translateService.instant(
              item.data['type']
            )}</span> `
          : this.translateService.instant('APPLICATION_TYPE_' + item.type),
      subtitle: this.datePipe.transform(item.data.created),
      // TODO: use object proporty without []
      image:
        item.type === UserApplicationType.WALKER
          ? null
          : item.data['images'] && item.data['images'][0],
      price:
        [UserApplicationType.SITTER, UserApplicationType.WALKER].indexOf(
          item.type
        ) !== -1
          ? item['price']
          : null,
      content: item.data.description,
      actions: {
        color: 'accent',
        icon: 'share',
        tooltipText: this.translateService.instant('SHARE')
      }
    };
  }

  shareApplication(application: UserApplicationDto) {
    const url =
      environment.origin +
      this.router
        .createUrlTree(this.getApplicationLink(application))
        .toString();
    const dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    dialogRef.afterClosed().subscribe(shareOptions => {});
  }

  openSettings() {
    const dialogRef = this.dialog.open(UserDetailsUpdateDialogComponent, {
      width: ModalSize.LARGE,
      data: { user: this.selectedUser }
    });

    dialogRef.afterClosed().subscribe(update => {
      if (!update) {
        return;
      }
      this.store.dispatch(
        new Update({
          id: this.selectedUser.id,
          body: {
            userData: {
              firstName: update.firstName,
              lastName: update.lastName,
              phoneNumber: update.phoneNumber || null,
              facebookUrl: update.facebookUrl || null
            }
          }
        })
      );
    });
  }
}
