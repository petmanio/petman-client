import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {
  @Input() url: string;

  constructor(public dialogRef: MatDialogRef<ShareDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { url: string }) {
  }

  ngOnInit() {
  }

}
