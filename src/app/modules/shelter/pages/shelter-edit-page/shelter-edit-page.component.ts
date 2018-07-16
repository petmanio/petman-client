import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { ModalSize, ShelterDto, UserDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromShelter from '@shelter/reducers';
import { Delete, Select, Update } from '@shelter/actions/shelter.actions';
import { SharedService } from '@shared/services/shared/shared.service';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { UserDetailsUpdateDialogComponent } from '@shared/components/user-details-update-dialog/user-details-update-dialog.component';

@Component({
  selector: 'app-shelter-edit-page',
  templateUrl: './shelter-edit-page.component.html',
  styleUrls: ['./shelter-edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShelterEditPageComponent {
  form: FormGroup;
  shelter: ShelterDto;
  user: UserDto;
  quillModules = SharedService.quillModules;
  user$ = this.store.pipe(select(fromAuth.getUser));
  pending$ = this.store.select(fromShelter.getShelterAddPagePending);
  error$ = this.store.select(fromShelter.getShelterAddPageError);
  shelter$ = this.store.pipe(select(fromShelter.getSelected));

  constructor(
    private store: Store<fromShelter.State>,
    private route: ActivatedRoute,
    private dialog: MatDialog,
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

    this.user$
      .pipe(
        map(user => (this.user = user)),
        take(1)
      )
      .subscribe();

    this.shelter$
      .pipe(
        map(shelter => {
          this.shelter = shelter;
          this.form = this.formConfig;
        }),
        take(1)
      )
      .subscribe();
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

  onButtonToggleChange() {
    const description = this.form.get('description');
    description.reset(this.shelter.description);
  }

  update() {
    if (!this.user.userData.phoneNumber || !this.user.userData.facebookUrl) {
      const dialogRef = this.dialog.open(UserDetailsUpdateDialogComponent, {
        width: ModalSize.LARGE,
        data: { user: this.user }
      });
      dialogRef.afterClosed().subscribe(update => {
        console.log(update);
      });
    } else {
      this.store.dispatch(
        new Update({ id: this.shelter.id, body: this.form.value })
      );
    }
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
