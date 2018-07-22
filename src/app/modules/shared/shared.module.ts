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
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { NgPipesModule, StripTagsPipe } from 'ngx-pipes';
import { NgxMaskModule } from 'ngx-mask';

import { MaterialModule } from '@material/material.module';

import * as fromShared from '@shared/reducers';
import { SharedEffects } from '@shared/effects/shared.effects';

import { RxDelayPipe } from '@shared/pipes/rx-delay/rx-delay.pipe';
import { RxDebouncePipe } from '@shared/pipes/rx-debounce/rx-debounce.pipe';
import { SafeHtmlPipe } from '@shared/pipes/safe-html/safe-html.pipe';
import { KeysPipe } from '@shared/pipes/keys/keys.pipe';
import { EllipsisPipe } from '@shared/pipes/ellipsis/ellipsis.pipe';
import { FromNowPipe } from '@shared/pipes/from-now/from-now.pipe';
import { IsHtmlPipe } from '@shared/pipes/is-html/is-html.pipe';

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
import { GoogleMapComponent } from '@shared/components/google-map/google-map.component';
import { ControlMessagesComponent } from '@shared/components/control-messages/control-messages.component';
import { UserDetailsUpdateDialogComponent } from './components/user-details-update-dialog/user-details-update-dialog.component';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  TranslateModule,
  FontAwesomeModule,
  ShareButtonsModule,
  InfiniteScrollModule,
  PerfectScrollbarModule,
  QuillModule,
  NgPipesModule,
  NgxMaskModule
];

const declarations = [
  RxDelayPipe,
  RxDebouncePipe,
  EllipsisPipe,
  FromNowPipe,
  SafeHtmlPipe,
  KeysPipe,
  IsHtmlPipe,
  CardComponent,
  ShareDialogComponent,
  ConfirmationDialogComponent,
  UserDetailsComponent,
  MasonryComponent,
  MasonryItemComponent,
  AddApplicationComponent,
  GoogleMapComponent,
  ControlMessagesComponent,
  UserDetailsUpdateDialogComponent
];

@NgModule({
  imports: [
    ...modules,

    StoreModule.forFeature('shared', fromShared.reducers),
    EffectsModule.forFeature([SharedEffects]),

    MaterialModule
  ],
  declarations: [...declarations],
  providers: [
    DatePipe,
    StripTagsPipe,
    UtilService,
    LocalStorageService,
    SharedService,
    ValidationService
  ],
  exports: [...modules, ...declarations],
  entryComponents: [
    ShareDialogComponent,
    ConfirmationDialogComponent,
    UserDetailsUpdateDialogComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
