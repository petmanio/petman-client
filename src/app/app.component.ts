import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ApplicationRef
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatSnackBar } from '@angular/material';
// TODO: change inport, rxjs is blacklisted
import { combineLatest, Subscription } from 'rxjs';
import { delay, tap, filter, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { MetaService } from '@ngx-meta/core';

import { UserDto } from '@petman/common';

import * as fromRoot from '@app/reducers';
import * as fromAuth from '@auth/reducers';
import * as fromUser from '@user/reducers';
import { UtilService } from '@shared/services/util/util.service';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

import { TranslateService } from '@translate/translate.service';
import { WelcomeDialogComponent } from '@core/welcome-dialog/welcome-dialog.component';
import { LanguageChangeSnackbarComponent } from '@core/language-change-snackbar/language-change-snackbar.component';
import { CleanError } from '@shared/actions/shared.actions';
import { ChangeUser, Logout } from '@auth/actions/auth.actions';
import { Geolocation } from '@user/actions/user.actions';
import { Categories } from '@poi/actions/poi.actions';
import { CloseSidenav, OpenSidenav, OpenMobileFilters } from '@app/actions/layout.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  hideFooter = false;
  showMobileFilterIcon = false;
  sideNavMode: 'side' | 'over' = 'side';
  sideNavState: boolean;
  currentLanguage: string;
  selectedUser: UserDto;
  redirectAfterSignUp: string;
  hideSignUpButton = false;
  languages$ = this.translateService.getLangList();
  showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
  loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  user$ = this.store.pipe(select(fromAuth.getUser));
  selectedUser$ = this.store.pipe(select(fromAuth.getSelectedUser));
  geolocationCountry$ = this.store.pipe(select(fromUser.getGeolocationCountry));
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private applicationRef: ApplicationRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private store: Store<fromRoot.State>,
    private localStorageService: LocalStorageService,
    private utilService: UtilService,
    @Inject(PLATFORM_ID) protected platformId: Object,
    @Inject(MetaService) private meta: MetaService
  ) {
    this.utilService.externalScripts();
    this.utilService.registerNewIcons();
  }

  ngOnInit() {
    // TODO: find way for for using UserEffect init
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new Geolocation());
    }

    // TODO: get language key from Language enum
    this.currentLanguage = this.translateService.getCurrentLang();

    this.languageChangeSnackBar();
    // this.welcomeDialog();

    // TODO: use effects init
    const selectedUserSubscription = this.selectedUser$
      .pipe(
        delay(300),
        tap((selectedUser: UserDto) => {
          this.selectedUser = selectedUser;
          if (this.selectedUser) {
            const selectedUserIdFromStorage = this.localStorageService.getItem('selectedUserId');
            if (selectedUserIdFromStorage && selectedUserIdFromStorage !== this.selectedUser.id) {
              this.store.dispatch(new ChangeUser(selectedUserIdFromStorage));
            }
          }
        })
      )
      .subscribe();

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
      this.sideNavMode = breakpoint.matches ? 'side' : 'over';
      if (active instanceof NavigationEnd) {
        this.store.dispatch(new CleanError());

        this.redirectAfterSignUp =
          ['/', '/404'].indexOf(active.urlAfterRedirects) === -1 ? active.urlAfterRedirects : null;

        if (isPlatformBrowser(this.platformId)) {
          const matDrawerContent = document.querySelector('.mat-drawer-content');
          if (matDrawerContent) {
            matDrawerContent.scrollTo(0, 0);
          }
        }

        if (!breakpoint.matches) {
          this.closeSideNav();
        }

        // const showSidenav = this.activatedRoute.data['showSidenav'];
        const showSidenav = UtilService.getRouteDataByKey(this.activatedRoute, 'showSidenav');

        if (typeof showSidenav !== 'undefined') {
          if (showSidenav && breakpoint.matches) {
            this.openSideNav();
          } else {
            this.closeSideNav();
          }
        }

        this.hideFooter = UtilService.getRouteDataByKey(this.activatedRoute, 'hideFooter');

        this.showMobileFilterIcon = UtilService.getRouteDataByKey(this.activatedRoute, 'showMobileFilterIcon');

        this.hideSignUpButton = UtilService.getRouteDataByKey(this.activatedRoute, 'hideSignUpButton');
      }
    });

    this.subscriptions.push(...[selectedUserSubscription, sidenavSubscription, routerBreakpointSubscription]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  selectedUserChange($event) {
    this.store.dispatch(new ChangeUser($event));
  }

  closeSideNav() {
    this.store.dispatch(new CloseSidenav());
  }

  openSideNav() {
    this.store.dispatch(new OpenSidenav());
  }

  toggleSidenav($event: Event) {
    $event.stopPropagation();
    if (this.sideNavState) {
      this.closeSideNav();
    } else {
      this.openSideNav();
    }
  }

  openedChange(state: boolean) {
    if (this.sideNavState === state) {
      return;
    }
    if (state) {
      this.openSideNav();
    } else {
      this.closeSideNav();
    }
  }

  openMobileFilters() {
    this.store.dispatch(new OpenMobileFilters());
  }

  changeLanguage(langCode: string) {
    this.translateService.changeLang(langCode);

    const metaSettings = UtilService.getRouteDataByKey(this.activatedRoute, 'meta');
    this.meta.update(this.router.url, metaSettings);

    this.currentLanguage = this.translateService.getCurrentLang();
    this.applicationRef.tick();
  }

  logOut() {
    this.store.dispatch(new Logout());
  }

  private welcomeDialog() {
    if (isPlatformBrowser(this.platformId)) {
      // TODO: use effect init and user$ observable
      if (!this.localStorageService.getItem('welcomeDialogShowed') && !this.localStorageService.getItem('token')) {
        setTimeout(() => {
          const dialogRef = this.dialog.open(WelcomeDialogComponent, {
            width: '90%'
          });
          dialogRef.afterClosed().subscribe(() => {
            this.localStorageService.setItem('welcomeDialogShowed', true);
          });
        }, 3000);
      }
    }
  }

  private languageChangeSnackBar() {
    const languageChangeAsked = this.localStorageService.getItem('languageChangeSnackBarShowed');

    if (isPlatformBrowser(this.platformId) && !languageChangeAsked) {
      this.geolocationCountry$
        .pipe(
          filter(country => !!country),
          delay(5000),
          tap(country => {
            if (country === 'AM' && this.currentLanguage !== 'hy') {
              this.snackBar
                .openFromComponent(LanguageChangeSnackbarComponent, {
                  data: {
                    text: 'Ողջույն, ցանկանում ե՞ք կայքի լեզուն փոխել հայերեն'
                  },
                  duration: 10000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top'
                })
                .afterDismissed()
                .subscribe(action => {
                  if (action.dismissedByAction) {
                    this.changeLanguage('hy');
                  }
                  this.localStorageService.setItem('languageChangeSnackBarShowed', true);
                });
            }
          }),
          take(1)
        )
        .subscribe();
    }
  }
}
