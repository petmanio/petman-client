import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export enum ConfirmationDialogType {
  INACTIVATE = 'INACTIVATE',
  DELETE = 'DELETE'
}

export interface IConfirmationDialogData {
  type: ConfirmationDialogType;
  poiId: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  ConfirmationDialogType = ConfirmationDialogType;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmationDialogData) {
  }

  onCancel() {
    this.dialogRef.close();
  }
}
