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
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import {
  CovalentFileModule,
  CovalentLoadingModule,
  CovalentMessageModule,
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
  MatProgressSpinnerModule,
  MatSelectModule,
  MatMenuModule,
  MatSidenavModule,
  MatChipsModule,
  MatCardModule,
  MatListModule,
  MatButtonToggleModule,
  MatTooltipModule,
  LayoutModule,

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
