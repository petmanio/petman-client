import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { combineLatest, Subscription } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MetaService } from '@ngx-meta/core';

import { Language, ModalSize, UserDto } from '@petman/common';

import { UtilService } from '@shared/services/util/util.service';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

import * as fromRoot from '@app/reducers';
import * as fromAuth from '@auth/reducers';
import { WelcomeDialogComponent } from '@core/welcome-dialog/welcome-dialog.component';
import { UserDetailsUpdateDialogComponent } from '@shared/components/user-details-update-dialog/user-details-update-dialog.component';
import { ChangeUser, Logout } from '@auth/actions/auth.actions';
import { Update as UserUpdate } from '@user/actions/user.actions';
import { Categories } from '@poi/actions/poi.actions';
import { CloseSidenav, OpenSidenav } from '@app/actions/layout.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  hideFooter = false;
  sideNavMode: 'side' | 'push' = 'side';
  sideNavState: boolean;
  currentLanguage: string;
  selectedUser: UserDto;
  redirectAfterSignUp: string;
  hideSignUpButton = false;
  showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  user$ = this.store.pipe(select(fromAuth.getUser));
  selectedUser$ = this.store.pipe(select(fromAuth.getSelectedUser));
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private translate: TranslateService,
    private meta: MetaService,
    private store: Store<fromRoot.State>,
    private localStorageService: LocalStorageService,
    private utilService: UtilService,
    @Inject(PLATFORM_ID) protected platformId: Object
  ) {
    this.utilService.externalScripts();
    this.utilService.registerNewIcons();
  }

  ngOnInit() {
    this.initNgxTranslate();

    if (isPlatformBrowser(this.platformId)) {
      this.welcomeDialog();
    }

    // TODO: use effects init
    const selectedUserSubscription = this.selectedUser$
      .pipe(
        delay(300),
        tap((selectedUser: UserDto) => {
          this.selectedUser = selectedUser;
          if (this.selectedUser) {
            const selectedUserIdFromStorage = this.localStorageService.getItem(
              'selectedUserId'
            );
            if (
              selectedUserIdFromStorage &&
              selectedUserIdFromStorage !== this.selectedUser.id
            ) {
              this.store.dispatch(new ChangeUser(selectedUserIdFromStorage));
            }
          }
        })
      )
      .subscribe();

    this.store.dispatch(new CloseSidenav());
    this.store.dispatch(new Categories({ limit: 10, offset: 0 }));

    const sidenavSubscription = this.showSidenav$.subscribe(state => {
      this.sideNavState = state;
      if (this.sideNavMode === 'side' && isPlatformBrowser(this.platformId)) {
        setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
      }
    });
    const routerBreakpointSubscription = combineLatest(
      this.router.events,
      this.breakpointObserver.observe([Breakpoints.Web])
    ).subscribe(event => {
      const [active, breakpoint] = event;
      this.sideNavMode = breakpoint.matches ? 'side' : 'push';
      if (active instanceof NavigationEnd) {
        this.redirectAfterSignUp =
          ['/', '/404'].indexOf(active.urlAfterRedirects) === -1
            ? active.urlAfterRedirects
            : null;

        if (isPlatformBrowser(this.platformId)) {
          const matDrawerContent = document.querySelector(
            '.mat-drawer-content'
          );
          if (matDrawerContent) {
            matDrawerContent.scrollTo(0, 0);
          }
        }

        if (!breakpoint.matches) {
          this.store.dispatch(new CloseSidenav());
        }

        // const showSidenav = this.activatedRoute.data['showSidenav'];
        const showSidenav = UtilService.getRouteDataByKey(
          this.activatedRoute,
          'showSidenav'
        );

        if (typeof showSidenav !== 'undefined') {
          if (showSidenav && breakpoint.matches) {
            this.store.dispatch(new OpenSidenav());
          } else {
            this.store.dispatch(new CloseSidenav());
          }
        }

        this.hideFooter = UtilService.getRouteDataByKey(
          this.activatedRoute,
          'hideFooter'
        );

        this.hideSignUpButton = UtilService.getRouteDataByKey(
          this.activatedRoute,
          'hideSignUpButton'
        );
      }
    });

    this.subscriptions.push(
      ...[
        selectedUserSubscription,
        sidenavSubscription,
        routerBreakpointSubscription
      ]
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onSelectedUserChange($event) {
    this.store.dispatch(new ChangeUser($event));
  }

  toggleSidenav($event: Event) {
    $event.stopPropagation();
    if (this.sideNavState) {
      this.store.dispatch(new CloseSidenav());
    } else {
      this.store.dispatch(new OpenSidenav());
    }
  }

  onLanguageChange(key: string) {
    const language = Language[key];
    this.currentLanguage = key;
    this.localStorageService.setItem('language', language);
    this.translate.use(language);
  }

  logOut() {
    this.store.dispatch(new Logout());
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
        new UserUpdate({
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

  private initNgxTranslate() {
    let languageKey;

    if (isPlatformBrowser(this.platformId)) {
      languageKey = UtilService.getBrowserLanguageToEnumKey(
        this.localStorageService.getItem('language') ||
          this.translate.getBrowserLang()
      );
    }

    if (!languageKey || !Language[languageKey]) {
      languageKey = 'EN';
    }

    const language = Language[languageKey];

    this.currentLanguage = languageKey;
    this.localStorageService.setItem('language', language);
    this.translate.setDefaultLang(language);
    this.translate.use(language).subscribe(() => {
      // TODO: this.meta.setTag('og:locale', 'en-US');
      this.meta.update(this.router.url);
    });
  }

  private welcomeDialog() {
    // TODO: use effect init and user$ observable
    if (
      !this.localStorageService.getItem('welcome-dialog-showed') &&
      !this.localStorageService.getItem('token')
    ) {
      setTimeout(() => {
        const dialogRef = this.dialog.open(WelcomeDialogComponent, {
          width: ModalSize.LARGE
        });
        dialogRef.afterClosed().subscribe(() => {
          this.localStorageService.setItem('welcome-dialog-showed', true);
        });
      }, 3000);
    }
  }
}
