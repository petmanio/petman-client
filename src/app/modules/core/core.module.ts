import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

import { throwIfAlreadyLoaded } from '@core/module-import-guard';
import { ToolbarComponent } from '@core/toolbar/toolbar.component';
import { SidenavComponent } from '@core/sidenav/sidenav.component';
import { FooterComponent } from '@core/footer/footer.component';
import { NavItemComponent } from '@core/nav-item/nav-item.component';
import { WelcomeDialogComponent } from '@core/welcome-dialog/welcome-dialog.component';

const declarations = [
  ToolbarComponent,
  SidenavComponent,
  NavItemComponent,
  FooterComponent,
  WelcomeDialogComponent
];

@NgModule({
  imports: [
    MaterialModule,
    RouterModule,

    SharedModule
  ],
  declarations: [
    ...declarations
  ],
  providers: [],
  exports: [
    ...declarations
  ],
  entryComponents: [WelcomeDialogComponent]
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

