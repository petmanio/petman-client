import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

import { throwIfAlreadyLoaded } from '@core/module-import-guard';
import { ToolbarComponent } from '@core/toolbar/toolbar.component';
import { SidenavComponent } from '@core/sidenav/sidenav.component';
import { FooterComponent } from '@core/footer/footer.component';
import { NavItemComponent } from '@core/nav-item/nav-item.component';

@NgModule({
  imports: [
    MaterialModule,
    SharedModule
  ],
  declarations: [
    ToolbarComponent,
    SidenavComponent,
    NavItemComponent,
    FooterComponent
  ],
  providers: [],
  exports: [
    ToolbarComponent,
    SidenavComponent,
    NavItemComponent,
    FooterComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}

