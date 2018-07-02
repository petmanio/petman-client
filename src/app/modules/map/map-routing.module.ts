import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListPageComponent } from '@map/list-page/list-page.component';

export const routes: Routes = [
  { path: '', component: ListPageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule {
}
