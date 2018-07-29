import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@auth/auth.guard';

import { SitterExistsGuard } from '@sitter/sitter-exists.guard';
import { SitterOwnerGuard } from '@sitter/sitter-owner.guard';
import { SitterCreatePageComponent } from '@sitter/pages/sitter-create-page/sitter-create-page.component';
import { SitterListPageComponent } from '@sitter/pages/sitter-list-page/sitter-list-page.component';
import { SitterDetailsPageComponent } from '@sitter/pages/sitter-details-page/sitter-details-page.component';
import { SitterUpdatePageComponent } from '@sitter/pages/sitter-update-page/sitter-update-page.component';

export const routes: Routes = [
  {
    path: '',
    component: SitterListPageComponent,
    pathMatch: 'full',
    data: {}
  },
  {
    path: 'add',
    component: SitterCreatePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: SitterDetailsPageComponent,
    canActivate: [SitterExistsGuard]
  },
  {
    path: ':id/edit',
    component: SitterUpdatePageComponent,
    canActivate: [AuthGuard, SitterExistsGuard, SitterOwnerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitterRoutingModule {}
