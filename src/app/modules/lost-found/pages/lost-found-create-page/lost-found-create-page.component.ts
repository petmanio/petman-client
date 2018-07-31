import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { take, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ModalSize, UserDto, LostFoundType } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromLostFound from '@lost-found/reducers';
import {
  Update as UserUpdate,
  UserActionTypes
} from '@user/actions/user.actions';
import { Create } from '@lost-found/actions/lost-found.actions';
import { SharedService } from '@shared/services/shared/shared.service';
import { UserDetailsUpdateDialogComponent } from '@shared/components/user-details-update-dialog/user-details-update-dialog.component';

@Component({
  selector: 'app-lost-found-create-page',
  templateUrl: './lost-found-create-page.component.html',
  styleUrls: ['./lost-found-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LostFoundCreatePageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  selectedUser: UserDto;
  quillModules = SharedService.quillModules;
  LostFoundType = LostFoundType;
  selectedUser$ = this.store.pipe(select(fromAuth.getSelectedUser));
  pending$ = this.store.select(fromLostFound.getLostFoundCreatePagePending);
  error$ = this.store.select(fromLostFound.getLostFoundCreatePageError);

  private subscriptions: Subscription[] = [];

  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private store: Store<fromLostFound.State>,
    @Inject(FormBuilder) private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(1000)
        ])
      ],
      images: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(4)
        ])
      ]
    });

    const selectedUserSubscription = this.selectedUser$.subscribe(
      selectedUser => (this.selectedUser = selectedUser)
    );

    this.subscriptions.push(selectedUserSubscription);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onButtonToggleChange() {
    const description = this.form.get('description');
    description.reset();
  }

  create() {
    if (
      this.selectedUser.userData.phoneNumber ||
      this.selectedUser.userData.facebookUrl
    ) {
      this.store.dispatch(new Create(this.form.value));
    } else {
      const dialogRef = this.dialog.open(UserDetailsUpdateDialogComponent, {
        width: ModalSize.LARGE,
        data: { user: this.selectedUser, askForUpdate: true }
      });
      dialogRef.afterClosed().subscribe(update => {
        if (!update) {
          return;
        }
        this.store.dispatch(
          new UserUpdate({
            id: this.selectedUser.id,
            body: {
              userData: {
                firstName: update.firstName,
                lastName: update.lastName,
                phoneNumber: update.phoneNumber || null,
                facebookUrl: update.facebookUrl || null
              }
            }
          })
        );

        this.actions$
          .ofType(UserActionTypes.UPDATE_SUCCESS)
          .pipe(
            tap(() => {
              if (
                this.selectedUser.userData.phoneNumber ||
                this.selectedUser.userData.facebookUrl
              ) {
                this.store.dispatch(new Create(this.form.value));
              }
            }),
            take(1)
          )
          .subscribe();
      });
    }
  }
}
