import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { ModalSize, AdoptDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromAdopt from '@adopt/reducers';
import { Delete, Select, Update } from '@adopt/actions/adopt.actions';
import { SharedService } from '@shared/services/shared/shared.service';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-adopt-update-page',
  templateUrl: './adopt-update-page.component.html',
  styleUrls: ['./adopt-update-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdoptUpdatePageComponent {
  form: FormGroup;
  adopt: AdoptDto;
  quillModules = SharedService.quillModules;
  selectedUser$ = this.store.pipe(select(fromAuth.getSelectedUser));
  pending$ = this.store.pipe(select(fromAdopt.getAdoptCreatePagePending));
  error$ = this.store.pipe(select(fromAdopt.getAdoptCreatePageError));
  adopt$ = this.store.pipe(select(fromAdopt.getSelected));

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private store: Store<fromAdopt.State>,
    @Inject(FormBuilder) private formBuilder: FormBuilder
  ) {
    this.error$ = this.store.select(fromAdopt.getAdoptUpdatePageError);
    this.pending$ = this.store.select(fromAdopt.getAdoptUpdatePagePending);

    this.route.params
      .pipe(
        map(params => new Select(params.id)),
        take(1)
      )
      .subscribe(this.store);

    this.adopt$
      .pipe(
        map(adopt => {
          this.adopt = adopt;
          this.form = this.formConfig;
        }),
        take(1)
      )
      .subscribe();
  }

  private get formConfig(): FormGroup {
    return this.formBuilder.group({
      description: [
        this.adopt.description,
        Validators.compose([
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(1000)
        ])
      ],
      images: [
        this.adopt.images,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(4)
        ])
      ]
    });
  }

  onButtonToggleChange() {
    const description = this.form.get('description');
    description.reset(this.adopt.description);
  }

  update() {
    this.store.dispatch(
      new Update({ id: this.adopt.id, body: this.form.value })
    );
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: ModalSize.MEDIUM,
      data: {}
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new Delete(this.adopt.id));
      }
    });
  }
}