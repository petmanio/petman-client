import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-language-change-snackbar',
  templateUrl: './language-change-snackbar.component.html',
  styleUrls: ['./language-change-snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageChangeSnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackBarRef: MatSnackBarRef<LanguageChangeSnackbarComponent>
  ) {}
}
