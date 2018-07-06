import { Pipe, PipeTransform } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({ name: 'appRxDelay' })
export class RxDelayPipe implements PipeTransform {
  transform(source: Observable<any>, delayTime: number = 300): Observable<any> {
    return source.pipe(delay(delayTime));
  }
}
