import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '@auth/reducers/login-page.reducer';
import { FbLogin } from '@auth/actions/auth.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  pending$ = this.store.select(fromStore.getPending);
  error$ = this.store.select(fromStore.getError);

  constructor(private store: Store<fromStore.State>) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.store.dispatch(new FbLogin());
  }

}
