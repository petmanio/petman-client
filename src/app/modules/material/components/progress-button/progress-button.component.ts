import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-button',
  templateUrl: './progress-button.component.html',
  styleUrls: ['./progress-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressButtonComponent implements OnInit {
  @Input('color') color: string;
  @Input('spinnerColor') spinnerColor: string;
  @Input('disabled') disabled;
  @Input('active') active;
  constructor() {
  }

  ngOnInit() {
  }
}
