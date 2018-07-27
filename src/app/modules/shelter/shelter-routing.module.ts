import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@auth/auth.guard';

import { ShelterExistsGuard } from '@shelter/shelter-exists.guard';
import { ShelterOwnerGuard } from '@shelter/shelter-owner.guard';
import { ShelterCreatePageComponent } from '@shelter/pages/shelter-create-page/shelter-create-page.component';
import { ShelterListPageComponent } from '@shelter/pages/shelter-list-page/shelter-list-page.component';
import { ShelterDetailsPageComponent } from '@shelter/pages/shelter-details-page/shelter-details-page.component';
import { ShelterUpdatePageComponent } from '@shelter/pages/shelter-update-page/shelter-update-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ShelterListPageComponent,
    pathMatch: 'full',
    data: {}
  },
  {
    path: 'add',
    component: ShelterCreatePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: ShelterDetailsPageComponent,
    canActivate: [ShelterExistsGuard]
  },
  {
    path: ':id/edit',
    component: ShelterUpdatePageComponent,
    canActivate: [AuthGuard, ShelterExistsGuard, ShelterOwnerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelterRoutingModule {}
