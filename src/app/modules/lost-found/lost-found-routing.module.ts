import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@auth/auth.guard';

import { LostFoundExistsGuard } from '@lost-found/lost-found-exists.guard';
import { LostFoundOwnerGuard } from '@lost-found/lost-found-owner.guard';
import { LostFoundCreatePageComponent } from '@lost-found/pages/lost-found-create-page/lost-found-create-page.component';
import { LostFoundListPageComponent } from '@lost-found/pages/lost-found-list-page/lost-found-list-page.component';
import { LostFoundDetailsPageComponent } from '@lost-found/pages/lost-found-details-page/lost-found-details-page.component';
import { LostFoundUpdatePageComponent } from '@lost-found/pages/lost-found-update-page/lost-found-update-page.component';

export const routes: Routes = [
  { path: '', component: LostFoundListPageComponent, pathMatch: 'full' },
  { path: 'add', component: LostFoundCreatePageComponent, canActivate: [AuthGuard] },
  { path: ':id', component: LostFoundDetailsPageComponent, canActivate: [LostFoundExistsGuard] },
  { path: ':id/edit', component: LostFoundUpdatePageComponent, canActivate: [AuthGuard, LostFoundExistsGuard, LostFoundOwnerGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LostFoundRoutingModule {
}
