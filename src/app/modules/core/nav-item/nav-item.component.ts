import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() svgIcon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[];
  @Input() routerLinkActive: any | any[] = '';
  @Input() activeClass: any | any[] = '';
  @Input() chip: number;
  @Output() activate = new EventEmitter();
}
