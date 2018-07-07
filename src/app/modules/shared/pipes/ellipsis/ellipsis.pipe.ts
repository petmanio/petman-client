import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appEllipsis' })
export class EllipsisPipe implements PipeTransform {
  transform(str: string, limit: number = 100) {
    str = str || '';
    const withoutHtml = str.replace(/(<([^>]+)>)/ig, '');

    if (str.length >= limit) {
      return withoutHtml.slice(0, limit) + '...';
    }

    return withoutHtml;
  }
}
