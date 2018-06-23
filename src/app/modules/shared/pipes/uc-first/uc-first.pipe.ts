import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appUcFirst' })
export class UcFirstPipe implements PipeTransform {
  transform(input: string) {
    if (input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    }
    return input;
  }
}
