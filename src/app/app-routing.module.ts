import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full', data: { showSidenav: false } },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: '**', component: NotFoundPageComponent, data: { showSidenav: false } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
