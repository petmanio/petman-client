import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Language, UserDto } from '@petman/common';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  @Input() loggedIn: boolean;
  @Input() selectedUser: UserDto;
  @Input() redirectAfterSignUp: string;
  @Input() hideSignUpButton: string;
  @Output() logOut = new EventEmitter();
  @Output() toggleMenu = new EventEmitter();

  Language = Language;

  constructor() {}
}
