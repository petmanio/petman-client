import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { ShareButtonsModule } from '@ngx-share/buttons';

import { MaterialModule } from '@material/material.module';

import * as fromShared from './reducers/shared.reducer';
import { SharedEffects } from './effects/shared.effects';

import { AsyncDelayPipe } from './pipes/async-delay/async-delay.pipe';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';
import { GalleryImagesPipe } from './pipes/gallery-images/gallery-images.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { ChunkPipe } from './pipes/chunk/chunk.pipe';
import { EllipsisPipe } from './pipes/ellipsis/ellipsis.pipe';
import { FromNowPipe } from './pipes/from-now/from-now.pipe';
import { SplicePipe } from './pipes/splice/splice.pipe';
import { StripTagsPipe } from './pipes/strip-tags/strip-tags.pipe';
import { UcFirstPipe } from './pipes/uc-first/uc-first.pipe';

import { UtilService } from './services/util/util.service';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { SharedService } from './services/shared/shared.service';

import { CardComponent } from './components/card/card.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { MasonryComponent } from './components/masonry/masonry.component';
import { MasonryItemComponent } from './components/masonry-item/masonry-item.component';
import { AddApplicationComponent } from './components/add-application/add-application.component';
import { MediumEditorComponent } from './components/medium-editor/medium-editor.component';
import { GoogleMapComponent } from './components/google-map/google-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    ShareButtonsModule.forRoot(),
    StoreModule.forFeature('shared', fromShared.reducer),
    EffectsModule.forFeature([SharedEffects]),

    MaterialModule,
  ],
  declarations: [
    AsyncDelayPipe,
    ChunkPipe,
    EllipsisPipe,
    FromNowPipe,
    SafeHtmlPipe,
    GalleryImagesPipe,
    KeysPipe,
    SplicePipe,
    StripTagsPipe,
    UcFirstPipe,
    CardComponent,
    ShareDialogComponent,
    ConfirmationDialogComponent,
    UserDetailsComponent,
    MasonryComponent,
    MasonryItemComponent,
    AddApplicationComponent,
    MediumEditorComponent,
    GoogleMapComponent
  ],
  providers: [UtilService, LocalStorageService, SharedService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,

    AsyncDelayPipe,
    ChunkPipe,
    EllipsisPipe,
    FromNowPipe,
    SafeHtmlPipe,
    GalleryImagesPipe,
    KeysPipe,
    SplicePipe,
    StripTagsPipe,
    UcFirstPipe,
    CardComponent,
    ShareDialogComponent,
    ConfirmationDialogComponent,
    UserDetailsComponent,
    MasonryComponent,
    MasonryItemComponent,
    AddApplicationComponent,
    MediumEditorComponent,
    GoogleMapComponent
  ],
  entryComponents: [ShareDialogComponent, ConfirmationDialogComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
