import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login-form-social',
  templateUrl: './login-form-social.component.html',
  styleUrls: ['./login-form-social.component.scss']
})
export class LoginFormSocialComponent {
  @Input() errorMessage: string | null;
  @Input() pending: boolean;
  @Output() submitted = new EventEmitter();

  constructor() {
  }
}
