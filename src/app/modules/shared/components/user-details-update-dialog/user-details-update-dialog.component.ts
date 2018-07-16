import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import {
  UserDto,
  phoneNumberValidatorRegex,
  facebookUrlValidator
} from '@petman/common';

@Component({
  selector: 'app-user-details-update-dialog',
  templateUrl: './user-details-update-dialog.component.html',
  styleUrls: ['./user-details-update-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsUpdateDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UserDetailsUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: UserDto },
    @Inject(FormBuilder) private formBuilder: FormBuilder
  ) {
    this.form = this.formConfig;
  }

  private get formConfig(): FormGroup {
    return this.formBuilder.group({
      phoneNumber: [
        this.data.user.userData.phoneNumber,
        Validators.pattern(phoneNumberValidatorRegex)
      ],
      facebookUrl: [
        this.data.user.userData.facebookUrl,
        Validators.pattern(facebookUrlValidator)
      ]
    });
  }

  ngOnInit() {}
}
