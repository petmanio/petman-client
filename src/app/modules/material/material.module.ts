import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatChipsModule,
  MatSnackBarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
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

// import { MzSliderComponent } from '@material/components/mz-slider/mz-slider.component';
// import { MzCarouselComponent } from '@material/components/mz-carousel/mz-carousel.component';
import { ProgressButtonComponent } from '@material/components/progress-button/progress-button.component';

const modules = [
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatButtonModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatMenuModule,
  MatSidenavModule,
  MatChipsModule,
  MatPaginatorModule,
  MatCardModule,
  MatListModule,
  MatButtonToggleModule,
  MatTooltipModule,
  LayoutModule,

  CovalentSearchModule,
  CovalentNotificationsModule,
  CovalentMenuModule,
  CovalentLayoutModule,
  CovalentFileModule,
  CovalentLoadingModule,
  CovalentMessageModule
];

const declarations = [
  // MzSliderComponent,
  // MzCarouselComponent,
  ProgressButtonComponent
];

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules, ...declarations],
  declarations: declarations
})
export class MaterialModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialModule,
      providers: []
    };
  }
}
