import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@auth/auth.guard';

import { UserExistsGuard } from '@user/user-exists.guard';
import { UserOwnerGuard } from '@user/user-owner.guard';
import { UserDetailsPageComponent } from '@user/pages/user-details-page/user-details-page.component';
import { UserUpdatePageComponent } from '@user/pages/user-update-page/user-update-page.component';


export const routes: Routes = [
  {
    path: ':id',
    component: UserDetailsPageComponent,
    canActivate: [UserExistsGuard]
  },
  {
    path: ':id/edit',
    component: UserUpdatePageComponent,
    canActivate: [AuthGuard, UserExistsGuard, UserOwnerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
