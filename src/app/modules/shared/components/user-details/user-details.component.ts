import { Component, Input, OnInit } from '@angular/core';

import { UserDto } from '@petman/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() user: UserDto;

  constructor() {
  }

  ngOnInit() {
  }

}
