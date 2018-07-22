import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { ModalSize, WalkerDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromWalker from '@walker/reducers';
import { Delete, Select, Update } from '@walker/actions/walker.actions';
import { SharedService } from '@shared/services/shared/shared.service';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-walker-update-page',
  templateUrl: './walker-update-page.component.html',
  styleUrls: ['./walker-update-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalkerUpdatePageComponent {
  form: FormGroup;
  walker: WalkerDto;
  quillModules = SharedService.quillModules;
  selectedUser$ = this.store.pipe(select(fromAuth.getSelectedUser));
  pending$ = this.store.pipe(select(fromWalker.getWalkerCreatePagePending));
  error$ = this.store.pipe(select(fromWalker.getWalkerCreatePageError));
  walker$ = this.store.pipe(select(fromWalker.getSelected));

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private store: Store<fromWalker.State>,
    @Inject(FormBuilder) private formBuilder: FormBuilder
  ) {
    this.error$ = this.store.select(fromWalker.getWalkerUpdatePageError);
    this.pending$ = this.store.select(fromWalker.getWalkerUpdatePagePending);

    this.route.params
      .pipe(
        map(params => new Select(params.id)),
        take(1)
      )
      .subscribe(this.store);

    this.walker$
      .pipe(
        map(walker => {
          this.walker = walker;
          this.form = this.formConfig;
        }),
        take(1)
      )
      .subscribe();
  }

  private get formConfig(): FormGroup {
    return this.formBuilder.group({
      price: [this.walker.price, Validators.required],
      description: [
        this.walker.description,
        Validators.compose([
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(1000)
        ])
      ]
    });
  }

  onButtonToggleChange() {
    const description = this.form.get('description');
    description.reset(this.walker.description);
  }

  update() {
    this.store.dispatch(
      new Update({ id: this.walker.id, body: this.form.value })
    );
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: ModalSize.MEDIUM,
      data: {}
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new Delete(this.walker.id));
      }
    });
  }
}
