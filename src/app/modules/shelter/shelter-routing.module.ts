import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@auth/auth.guard';

import { ShelterExistsGuard } from '@shelter/shelter-exists.guard';
import { ShelterOwnerGuard } from '@shelter/shelter-owner.guard';
import { AddPageComponent } from '@shelter/pages/add-page/add-page.component';
import { ListPageComponent } from '@shelter/pages/list-page/list-page.component';
import { DetailsPageComponent } from '@shelter/pages/details-page/details-page.component';
import { EditPageComponent } from '@shelter/pages/edit-page/edit-page.component';

export const routes: Routes = [
  { path: '', component: ListPageComponent, pathMatch: 'full' },
  { path: 'add', component: AddPageComponent, canActivate: [AuthGuard] },
  { path: ':id', component: DetailsPageComponent, canActivate: [ShelterExistsGuard] },
  { path: ':id/edit', component: EditPageComponent, canActivate: [AuthGuard, ShelterExistsGuard, ShelterOwnerGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelterRoutingModule {
}
