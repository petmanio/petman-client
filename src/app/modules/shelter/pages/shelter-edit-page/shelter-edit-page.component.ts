import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { ModalSize, ShelterDto } from '@petman/common';

import * as fromShelter from '@shelter/reducers';
import { Delete, Select, Update } from '@shelter/actions/shelter.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  pending$ = this.store.select(fromShelter.getShelterAddPagePending);
  error$ = this.store.select(fromShelter.getShelterAddPageError);
  shelter$ = this.store.pipe(select(fromShelter.getSelected));
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromShelter.State>,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    @Inject(FormBuilder) private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.error$ = this.store.select(fromShelter.getShelterEditPageError);
    this.pending$ = this.store.select(fromShelter.getShelterEditPagePending);

    const paramsSubscription = route.params
      .pipe(map(params => new Select(params.id)))
      .subscribe(store);

    const shelterSubscription = this.shelter$.subscribe(shelter => {
      if (shelter) {
        this.shelter = shelter;
        this.form = this.formConfig;
      }
    });

    this.subscriptions.push(...[paramsSubscription, shelterSubscription]);
  }

  private get formConfig(): FormGroup {
    return this.formBuilder.group({
      id: this.shelter.id,
      price: [this.shelter.price, Validators.required],
      description: [
        this.shelter.description,
        Validators.compose([Validators.required, Validators.minLength(200), Validators.maxLength(2000)])
      ],
      images: [
        this.shelter.images,
        Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(4)])
      ]
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  update() {
    this.store.dispatch(new Update(this.form.value));
  }

  onDelete() {
    const _dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: ModalSize.MEDIUM,
      data: {}
    });
    _dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(new Delete(this.shelter.id));
      }
    });
  }
}