import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { UserDto } from '../../../../../common/models/user.model';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddApplicationComponent implements OnInit {
  @Input() user: UserDto;

  constructor() {
  }

  get avatar(): string {
    if (this.user) {
      return this.user.userData.avatar;
    }
    return '/assets/logo.png';
  }

  ngOnInit() {
  }

}
