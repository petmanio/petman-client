import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-form-social',
  templateUrl: './login-form-social.component.html',
  styleUrls: ['./login-form-social.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormSocialComponent {
  @Input() errorMessage: string;
  @Input() pending: boolean;
  @Output() submitted = new EventEmitter();

  constructor() {
  }
}
