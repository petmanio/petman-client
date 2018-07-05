import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { SharedService } from '@shared/services/shared/shared.service';

@Injectable()
export class SharedEffects {
  constructor(private actions$: Actions, private sharedService: SharedService) {
  }
}
