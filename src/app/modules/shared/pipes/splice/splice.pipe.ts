import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appSplice' })
export class SplicePipe implements PipeTransform {
  transform(arr: any[] = [], size: number = 2) {
    const parts = Math.ceil(arr.length / size);
    const res = [];
    while (arr.length) {
      res.push(arr.splice(0, parts));
    }
    return res;
  }
}
