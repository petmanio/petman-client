import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@auth/auth.guard';

import { WalkerExistsGuard } from '@walker/walker-exists.guard';
import { WalkerOwnerGuard } from '@walker/walker-owner.guard';
import { WalkerCreatePageComponent } from '@walker/pages/walker-create-page/walker-create-page.component';
import { WalkerListPageComponent } from '@walker/pages/walker-list-page/walker-list-page.component';
import { WalkerDetailsPageComponent } from '@walker/pages/walker-details-page/walker-details-page.component';
import { WalkerUpdatePageComponent } from '@walker/pages/walker-update-page/walker-update-page.component';

export const routes: Routes = [
  { path: '', component: WalkerListPageComponent, pathMatch: 'full' },
  { path: 'add', component: WalkerCreatePageComponent, canActivate: [AuthGuard] },
  { path: ':id', component: WalkerDetailsPageComponent, canActivate: [WalkerExistsGuard] },
  { path: ':id/edit', component: WalkerUpdatePageComponent, canActivate: [AuthGuard, WalkerExistsGuard, WalkerOwnerGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalkerRoutingModule {
}
