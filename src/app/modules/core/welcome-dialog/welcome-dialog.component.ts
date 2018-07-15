import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<WelcomeDialogComponent>) {
  }

  ngOnInit() {
  }

}
