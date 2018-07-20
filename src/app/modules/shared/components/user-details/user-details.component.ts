import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { UserDto } from '@petman/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnInit {
  @Input() isOwner: boolean;
  @Input() loggedIn: boolean;
  @Input() user: UserDto;

  constructor() {
  }

  ngOnInit() {
  }

}
