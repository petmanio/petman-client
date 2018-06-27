import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() {
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'REQUIRED_ERROR_MESSAGE',
      'minlength': 'MIN_LENGTH_ERROR_MESSAGE'
    };

    return config[validatorName];
  }
}
