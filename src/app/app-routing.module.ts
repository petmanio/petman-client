import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DenyAuthGuard } from '@auth/deny-auth.guard';
import { HomePageComponent } from '@app/pages/home-page/home-page.component';
import { NotFoundPageComponent } from '@app/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full', data: { showSidenav: false } },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule', canActivate: [DenyAuthGuard], data: { showSidenav: false } },
  { path: 'shelters', loadChildren: './modules/shelter/shelter.module#ShelterModule', data: { showSidenav: true } },
  { path: 'organizations', loadChildren: './modules/organization/organization.module#OrganizationModule', data: { showSidenav: true } },
  { path: '404', component: NotFoundPageComponent, data: { showSidenav: false } },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
