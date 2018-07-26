import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { UserDto } from '@petman/common';

interface ISidenavComponent {
  onClick($event: Event);
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements ISidenavComponent, OnInit {
  @Input() opened = false;
  @Input() mode: string;
  @Input() user: UserDto;
  @Input() selectedUser: UserDto;
  @Output() itemActivate = new EventEmitter();
  @Output() selectedUserChange = new EventEmitter<number>();
  @Output() openedChange = new EventEmitter<boolean>();
  @Output() close = new EventEmitter();
  @Output() open = new EventEmitter();

  isHomeActive;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
      } else if (event instanceof NavigationEnd) {
        this.isHomeActive = this.router.url === '/' ? 'pm-is-active' : '';
      }
    });
  }

  onClick($event: Event) {
    $event.stopPropagation();
  }
}
