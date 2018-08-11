import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@auth/auth.guard';

import { AdoptExistsGuard } from '@adopt/adopt-exists.guard';
import { AdoptOwnerGuard } from '@adopt/adopt-owner.guard';
import { AdoptCreatePageComponent } from '@adopt/pages/adopt-create-page/adopt-create-page.component';
import { AdoptListPageComponent } from '@adopt/pages/adopt-list-page/adopt-list-page.component';
import { AdoptDetailsPageComponent } from '@adopt/pages/adopt-details-page/adopt-details-page.component';
import { AdoptUpdatePageComponent } from '@adopt/pages/adopt-update-page/adopt-update-page.component';

export const routes: Routes = [
  { path: '', component: AdoptListPageComponent, pathMatch: 'full', data: { showMobileFilterIcon: true } },
  { path: 'add', component: AdoptCreatePageComponent, canActivate: [AuthGuard] },
  { path: ':id', component: AdoptDetailsPageComponent, canActivate: [AdoptExistsGuard] },
  { path: ':id/edit', component: AdoptUpdatePageComponent, canActivate: [AuthGuard, AdoptExistsGuard, AdoptOwnerGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdoptRoutingModule {}
