import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { ModalSize, SitterDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromSitter from '@sitter/reducers';
import { Delete, Select, Update } from '@sitter/actions/sitter.actions';
import { SharedService } from '@shared/services/shared/shared.service';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-sitter-update-page',
  templateUrl: './sitter-update-page.component.html',
  styleUrls: ['./sitter-update-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SitterUpdatePageComponent {
  form: FormGroup;
  sitter: SitterDto;
  quillModules = SharedService.quillModules;
  selectedUser$ = this.store.pipe(select(fromAuth.getSelectedUser));
  pending$ = this.store.pipe(select(fromSitter.getSitterCreatePagePending));
  error$ = this.store.pipe(select(fromSitter.getSitterCreatePageError));
  sitter$ = this.store.pipe(select(fromSitter.getSelected));

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private store: Store<fromSitter.State>,
    @Inject(FormBuilder) private formBuilder: FormBuilder
  ) {
    this.error$ = this.store.select(fromSitter.getSitterUpdatePageError);
    this.pending$ = this.store.select(fromSitter.getSitterUpdatePagePending);

    this.route.params
      .pipe(
        map(params => new Select(params.id)),
        take(1)
      )
      .subscribe(this.store);

    this.sitter$
      .pipe(
        map(sitter => {
          this.sitter = sitter;
          this.form = this.formConfig;
        }),
        take(1)
      )
      .subscribe();
  }

  private get formConfig(): FormGroup {
    return this.formBuilder.group({
      price: [this.sitter.price, Validators.required],
      description: [
        this.sitter.description,
        Validators.compose([
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(1000)
        ])
      ],
      images: [
        this.sitter.images,
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
    description.reset(this.sitter.description);
  }

  update() {
    this.store.dispatch(
      new Update({ id: this.sitter.id, body: this.form.value })
    );
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: ModalSize.MEDIUM,
      data: {}
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new Delete(this.sitter.id));
      }
    });
  }
}
