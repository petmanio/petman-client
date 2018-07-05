import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { AuthGuard } from '@auth/auth.guard';

// import { PoiExistsGuard } from '@poi/poi-exists.guard';
// import { PoiOwnerGuard } from '@poi/poi-owner.guard';
// import { AddPageComponent } from '@poi/pages/add-page/add-page.component';
// import { ListPageComponent } from '@poi/pages/list-page/list-page.component';
// import { DetailsPageComponent } from '@poi/pages/details-page/details-page.component';
// import { EditPageComponent } from '@poi/pages/edit-page/edit-page.component';

export const routes: Routes = [
  // { path: '', component: ListPageComponent, pathMatch: 'full' },
  // { path: 'add', component: AddPageComponent, canActivate: [AuthGuard] },
  // { path: ':id', component: DetailsPageComponent, canActivate: [PoiExistsGuard] },
  // { path: ':id/edit', component: EditPageComponent, canActivate: [AuthGuard, PoiExistsGuard, PoiOwnerGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoiRoutingModule {
}
