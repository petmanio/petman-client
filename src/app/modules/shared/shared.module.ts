import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareButtonsModule } from '@ngx-share/buttons';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {NgPipesModule} from 'ngx-pipes';

import { MaterialModule } from '@material/material.module';

import * as fromShared from '@shared/reducers/shared.reducer';
import { SharedEffects } from '@shared/effects/shared.effects';

import { AsyncDelayPipe } from '@shared/pipes/async-delay/async-delay.pipe';
import { SafeHtmlPipe } from '@shared/pipes/safe-html/safe-html.pipe';
import { GalleryImagesPipe } from '@shared/pipes/gallery-images/gallery-images.pipe';
import { KeysPipe } from '@shared/pipes/keys/keys.pipe';
import { ChunkPipe } from '@shared/pipes/chunk/chunk.pipe';
import { EllipsisPipe } from '@shared/pipes/ellipsis/ellipsis.pipe';
import { FromNowPipe } from '@shared/pipes/from-now/from-now.pipe';
import { SplicePipe } from '@shared/pipes/splice/splice.pipe';
import { StripTagsPipe } from '@shared/pipes/strip-tags/strip-tags.pipe';
import { UcFirstPipe } from '@shared/pipes/uc-first/uc-first.pipe';

import { UtilService } from '@shared/services/util/util.service';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service';
import { SharedService } from '@shared/services/shared/shared.service';
import { ValidationService } from '@shared/services/validation/validation.service';

import { CardComponent } from '@shared/components/card/card.component';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { UserDetailsComponent } from '@shared/components/user-details/user-details.component';
import { MasonryComponent } from '@shared/components/masonry/masonry.component';
import { MasonryItemComponent } from '@shared/components/masonry-item/masonry-item.component';
import { AddApplicationComponent } from '@shared/components/add-application/add-application.component';
import { MediumEditorComponent } from '@shared/components/medium-editor/medium-editor.component';
import { GoogleMapComponent } from '@shared/components/google-map/google-map.component';
import { ControlMessagesComponent } from '@shared/components/control-messages/control-messages.component';

const declarations = [
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
  GoogleMapComponent,
  ControlMessagesComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    FontAwesomeModule,
    ShareButtonsModule,
    InfiniteScrollModule,
    NgPipesModule,

    StoreModule.forFeature('shared', fromShared.reducer),
    EffectsModule.forFeature([SharedEffects]),

    MaterialModule,
  ],
  declarations: [
    ...declarations
  ],
  providers: [DatePipe, UtilService, LocalStorageService, SharedService, ValidationService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    FontAwesomeModule,
    InfiniteScrollModule,
    NgPipesModule,

    ...declarations
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
