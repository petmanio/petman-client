import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { DenyAuthGuard } from '@auth/deny-auth.guard';
import { HomePageComponent } from '@app/pages/home-page/home-page.component';
import { NotFoundPageComponent } from '@app/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
    canActivate: [MetaGuard],
    data: { showSidenav: false }
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule',
    canActivate: [DenyAuthGuard, MetaGuard],
    data: { showSidenav: false, hideSignUpButton: true }
  },
  {
    path: 'shelters',
    loadChildren: './modules/shelter/shelter.module#ShelterModule',
    canActivateChild: [MetaGuard],
    data: { showSidenav: true, meta: { title: 'SHELTERS' } }
  },
  {
    path: 'walkers',
    loadChildren: './modules/walker/walker.module#WalkerModule',
    canActivateChild: [MetaGuard],
    data: { showSidenav: true, meta: { title: 'WALKERS' } }
  },
  {
    path: 'adoption',
    loadChildren: './modules/adopt/adopt.module#AdoptModule',
    canActivate: [MetaGuard],
    data: { showSidenav: true, meta: { title: 'ADOPTION' } }
  },
  {
    path: 'lost-found',
    loadChildren: './modules/lost-found/lost-found.module#LostFoundModule',
    canActivate: [MetaGuard],
    data: { showSidenav: true, meta: { title: 'LOST_AND_FOUND' } }
  },
  {
    path: 'pois',
    loadChildren: './modules/poi/poi.module#PoiModule',
    canActivate: [MetaGuard],
    data: { showSidenav: true }
  },
  {
    path: 'map',
    loadChildren: './modules/map/map.module#MapModule',
    canActivate: [MetaGuard],
    data: { showSidenav: true, hideFooter: true, meta: { title: 'MAP' } }
  },
  {
    path: '404',
    component: NotFoundPageComponent,
    canActivate: [MetaGuard],
    data: { showSidenav: false, meta: { title: 'PAGE_NOT_FOUND' } }
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
