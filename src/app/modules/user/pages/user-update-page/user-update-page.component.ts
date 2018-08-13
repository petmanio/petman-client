import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { map, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { UserDto } from '@petman/common';

import * as fromAuth from '@auth/reducers';
import * as fromUser from '@user/reducers';
import { Select, Update } from '@user/actions/user.actions';

@Component({
  selector: 'app-user-update-page',
  templateUrl: './user-update-page.component.html',
  styleUrls: ['./user-update-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserUpdatePageComponent {
  form: FormGroup;
  user: UserDto;
  selectedUser$ = this.store.pipe(select(fromAuth.getSelectedUser));
  pending$ = this.store.pipe(select(fromUser.getUserUpdatePagePending));
  error$ = this.store.pipe(select(fromUser.getUserUpdatePageError));
  user$ = this.store.pipe(select(fromUser.getSelectedUser));

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private store: Store<fromUser.State>,
    @Inject(FormBuilder) private formBuilder: FormBuilder
  ) {
    this.error$ = this.store.select(fromUser.getUserUpdatePageError);
    this.pending$ = this.store.select(fromUser.getUserUpdatePagePending);

    this.route.params
      .pipe(
        map(params => new Select(params.id)),
        take(1)
      )
      .subscribe(this.store);

    this.user$
      .pipe(
        map(user => {
          this.user = user;
          this.form = this.formConfig;
        }),
        take(1)
      )
      .subscribe();
  }

  private get formConfig(): FormGroup {
    return this.formBuilder.group({});
  }

  update() {
    this.store.dispatch(
      new Update({ id: this.user.id, body: this.form.value })
    );
  }
}
