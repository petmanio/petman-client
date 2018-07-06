import { Pipe, PipeTransform } from '@angular/core';
import * as isHtml from 'is-html';

@Pipe({ name: 'appIsHtml' })
export class IsHtmlPipe implements PipeTransform {
  transform(value: string): boolean {
    return isHtml(value);
  }
}
