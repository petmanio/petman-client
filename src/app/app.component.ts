import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { Language, UserDto } from '@petman/common';

import { UtilService } from '@shared/services/util/util.service';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';

import * as fromRoot from '@app/reducers';
import * as fromAuth from '@auth/reducers';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { ChangeUser, Logout } from '@auth/actions/auth.actions';
import { CloseSidenav, OpenSidenav } from '@app/actions/layout.action';
import { ServiceList } from '@shared/actions/shared.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  loggedIn$: Observable<boolean>;
  user$: Observable<UserDto>;
  selectedUser$: Observable<UserDto>;
  showSidenav$: Observable<boolean>;
  sideNavMode: 'side' | 'push' = 'side';
  sideNavState: boolean;
  currentLanguage: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver,
    private translate: TranslateService,
    private store: Store<fromRoot.State>,
    private localStorageService: LocalStorageService,
    private utilService: UtilService,
    @Inject(PLATFORM_ID) protected platformId: Object
  ) {
    this.utilService.externalScripts();
    this.utilService.registerNewIcons();
    this.showSidenav$ = this.store.select(fromRoot.getShowSidenav);
    this.loggedIn$ = this.store.select(fromAuth.getLoggedIn);
    this.user$ = this.store.select(fromAuth.getUser);
    this.selectedUser$ = this.store.select(fromAuth.getSelectedUser);
  }

  ngOnInit(): void {
    this.initLanguage();

    // TODO: use effects init
    this.store.dispatch(new ChangeUser(+this.localStorageService.getItem('selectedUserId')));
    this.store.dispatch(new CloseSidenav());
    this.store.dispatch(new ServiceList());

    const sidenavSubscription = this.showSidenav$.subscribe(state => {
      this.sideNavState = state;
      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
      }
    });
    const routerBreakpointSubscription = combineLatest(
      this.router.events,
      this.breakpointObserver.observe([Breakpoints.Web]))
      .subscribe((event) => {
        const [active, breakpoint] = event;
        this.sideNavMode = breakpoint.matches ? 'side' : 'push';
        if (active instanceof NavigationEnd) {
          if (!breakpoint.matches) {
            this.store.dispatch(new CloseSidenav());
          }
          // const showSidenav = this.activatedRoute.data['showSidenav'];
          const showSidenav = UtilService.getRouteDataByKey(this.activatedRoute, 'showSidenav');
          if (typeof showSidenav !== 'undefined') {
            if (showSidenav && breakpoint.matches) {
              this.store.dispatch(new OpenSidenav());
            } else {
              this.store.dispatch(new CloseSidenav());
            }
          }
        }
      });

    this.subscriptions.push(sidenavSubscription);
    this.subscriptions.push(routerBreakpointSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onSelectedUserChange($event): void {
    this.store.dispatch(new ChangeUser($event.value));
  }

  toggleSidenav($event: Event): void {
    $event.stopPropagation();
    if (this.sideNavState) {
      this.store.dispatch(new CloseSidenav());
    } else {
      this.store.dispatch(new OpenSidenav());
    }
  }

  onLanguageChange(key: string): void {
    const language = Language[key];
    this.currentLanguage = key;
    this.localStorageService.setItem('language', language);
    this.translate.use(language);
  }

  onLogOut(): void {
    this.store.dispatch(new Logout());
  }

  private initLanguage(): void {
    let languageKey = UtilService.getBrowserLanguageToEnumKey(
      this.localStorageService.getItem('language') ||
      this.translate.getBrowserLang()
    );

    if (!languageKey || !Language[languageKey]) {
      languageKey = 'EN';
    }

    const language = Language[languageKey];

    this.currentLanguage = languageKey;
    this.localStorageService.setItem('language', language);
    this.translate.setDefaultLang(language);
    this.translate.use(language);
  }
}
