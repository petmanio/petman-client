import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@auth/auth.guard';

import { ShelterExistsGuard } from '@shelter/shelter-exists.guard';
import { ShelterOwnerGuard } from '@shelter/shelter-owner.guard';
import { ShelterAddPageComponent } from '@shelter/pages/shelter-add-page/shelter-add-page.component';
import { ShelterListPageComponent } from '@shelter/pages/shelter-list-page/shelter-list-page.component';
import { ShelterDetailsPageComponent } from '@shelter/pages/shelter-details-page/shelter-details-page.component';
import { ShelterEditPageComponent } from '@shelter/pages/shelter-edit-page/shelter-edit-page.component';

export const routes: Routes = [
  { path: '', component: ShelterListPageComponent, pathMatch: 'full' },
  { path: 'add', component: ShelterAddPageComponent, canActivate: [AuthGuard] },
  { path: ':id', component: ShelterDetailsPageComponent, canActivate: [ShelterExistsGuard] },
  { path: ':id/edit', component: ShelterEditPageComponent, canActivate: [AuthGuard, ShelterExistsGuard, ShelterOwnerGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelterRoutingModule {
}
