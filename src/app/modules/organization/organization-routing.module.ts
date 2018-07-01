import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AuthGuard } from '@auth/auth.guard';

// import { OrganizationExistsGuard } from '@organization/organization-exists.guard';
// import { OrganizationOwnerGuard } from '@organization/organization-owner.guard';
// import { AddPageComponent } from '@organization/pages/add-page/add-page.component';
// import { ListPageComponent } from '@organization/pages/list-page/list-page.component';
// import { DetailsPageComponent } from '@organization/pages/details-page/details-page.component';
// import { EditPageComponent } from '@organization/pages/edit-page/edit-page.component';

export const routes: Routes = [
  // { path: '', component: ListPageComponent, pathMatch: 'full' },
  // { path: 'add', component: AddPageComponent, canActivate: [AuthGuard] },
  // { path: ':id', component: DetailsPageComponent, canActivate: [OrganizationExistsGuard] },
  // { path: ':id/edit', component: EditPageComponent, canActivate: [AuthGuard, OrganizationExistsGuard, OrganizationOwnerGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {
}
