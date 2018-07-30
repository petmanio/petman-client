import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { ModalSize, LostFoundDto, LostFoundType } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromLostFound from '@lost-found/reducers';
import { Delete, Select, Update } from '@lost-found/actions/lost-found.actions';
import { SharedService } from '@shared/services/shared/shared.service';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-lost-found-update-page',
  templateUrl: './lost-found-update-page.component.html',
  styleUrls: ['./lost-found-update-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LostFoundUpdatePageComponent {
  form: FormGroup;
  lostFound: LostFoundDto;
  quillModules = SharedService.quillModules;
  LostFoundType = LostFoundType;
  selectedUser$ = this.store.pipe(select(fromAuth.getSelectedUser));
  pending$ = this.store.pipe(
    select(fromLostFound.getLostFoundUpdatePagePending)
  );
  error$ = this.store.pipe(select(fromLostFound.getLostFoundUpdatePageError));
  lostFound$ = this.store.pipe(select(fromLostFound.getSelected));

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private store: Store<fromLostFound.State>,
    @Inject(FormBuilder) private formBuilder: FormBuilder
  ) {
    this.route.params
      .pipe(
        map(params => new Select(params.id)),
        take(1)
      )
      .subscribe(this.store);

    this.lostFound$
      .pipe(
        map(lostFound => {
          this.lostFound = lostFound;
          this.form = this.formConfig;
        }),
        take(1)
      )
      .subscribe();
  }

  private get formConfig(): FormGroup {
    return this.formBuilder.group({
      type: [this.lostFound.type, Validators.required],
      description: [
        this.lostFound.description,
        Validators.compose([
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(1000)
        ])
      ],
      images: [
        this.lostFound.images,
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
    description.reset(this.lostFound.description);
  }

  update() {
    this.store.dispatch(
      new Update({ id: this.lostFound.id, body: this.form.value })
    );
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: ModalSize.MEDIUM,
      data: {}
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new Delete(this.lostFound.id));
      }
    });
  }
}
