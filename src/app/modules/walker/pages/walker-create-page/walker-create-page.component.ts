import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { take, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ModalSize, UserDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromWalker from '@walker/reducers';
import { Update as UserUpdate, UserActionTypes } from '@user/actions/user.actions';
import { Create } from '@walker/actions/walker.actions';
import { UserDetailsUpdateDialogComponent } from '@shared/components/user-details-update-dialog/user-details-update-dialog.component';

@Component({
  selector: 'app-walker-create-page',
  templateUrl: './walker-create-page.component.html',
  styleUrls: ['./walker-create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalkerCreatePageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  selectedUser: UserDto;
  selectedUser$ = this.store.pipe(select(fromAuth.getSelectedUser));
  pending$ = this.store.select(fromWalker.getWalkerCreatePagePending);
  error$ = this.store.select(fromWalker.getWalkerCreatePageError);
  private subscriptions: Subscription[] = [];

  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private store: Store<fromWalker.State>,
    @Inject(FormBuilder) private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      price: ['', Validators.required],
      description: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(1000)
        ])
      ]
    });

    const selectedSubscription = this.selectedUser$.subscribe(
      selectedUser => (this.selectedUser = selectedUser)
    );

    this.subscriptions.push(selectedSubscription);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
