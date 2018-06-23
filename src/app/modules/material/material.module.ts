import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import {
  CovalentFileModule,
  CovalentLayoutModule,
  CovalentLoadingModule,
  CovalentMenuModule,
  CovalentMessageModule,
  CovalentNotificationsModule,
  CovalentSearchModule
} from '@covalent/core';

@NgModule({
  imports: [
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatChipsModule,
    MatPaginatorModule,
    MatCardModule,
    MatListModule,
    LayoutModule,

    CovalentSearchModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentLayoutModule,
    CovalentFileModule,
    CovalentLoadingModule,
    CovalentMessageModule,
  ],
  exports: [
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatChipsModule,
    MatPaginatorModule,
    MatCardModule,
    MatListModule,
    LayoutModule,

    CovalentSearchModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentLayoutModule,
    CovalentFileModule,
    CovalentLoadingModule,
    CovalentMessageModule,
  ],
  declarations: []
})
export class MaterialModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialModule,
      providers: [],
    };
  }
}
