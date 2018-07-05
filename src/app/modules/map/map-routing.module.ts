import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MapPageComponent } from '@map/map-page/map-page.component';

export const routes: Routes = [
  { path: '', component: MapPageComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule {
}
