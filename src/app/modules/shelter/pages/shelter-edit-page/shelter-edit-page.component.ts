import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { ModalSize, ShelterDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromShelter from '@shelter/reducers';
import { Delete, Select, Update } from '@shelter/actions/shelter.actions';
import { SharedService } from '@shared/services/shared/shared.service';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-shelter-edit-page',
  templateUrl: './shelter-edit-page.component.html',
  styleUrls: ['./shelter-edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShelterEditPageComponent implements OnDestroy {
  form: FormGroup;
  shelter: ShelterDto;
  quillModules = SharedService.quillModules;
  selectedUser$ = this.store.pipe(select(fromAuth.getSelectedUser));
  pending$ = this.store.pipe(select(fromShelter.getShelterAddPagePending));
  error$ = this.store.pipe(select(fromShelter.getShelterAddPageError));
  shelter$ = this.store.pipe(select(fromShelter.getSelected));
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private store: Store<fromShelter.State>,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.error$ = this.store.select(fromShelter.getShelterEditPageError);
    this.pending$ = this.store.select(fromShelter.getShelterEditPagePending);

    this.route.params
      .pipe(
        map(params => new Select(params.id)),
        take(1)
      )
      .subscribe(this.store);

    const shelterSubscription = this.shelter$.subscribe(shelter => {
      this.shelter = shelter;
      this.form = this.formConfig;
    });

    this.subscriptions.push(...[shelterSubscription]);
  }

  private get formConfig(): FormGroup {
    return this.formBuilder.group({
      price: [this.shelter.price, Validators.required],
      description: [
        this.shelter.description,
        Validators.compose([
          Validators.required,
          Validators.minLength(200),
          Validators.maxLength(2000)
        ])
      ],
      images: [
        this.shelter.images,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(4)
        ])
      ]
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onButtonToggleChange() {
    const description = this.form.get('description');
    description.reset(this.shelter.description);
  }

  update() {
    this.store.dispatch(
      new Update({ id: this.shelter.id, body: this.form.value })
    );
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: ModalSize.MEDIUM,
      data: {}
    });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new Delete(this.shelter.id));
      }
    });
  }
}
