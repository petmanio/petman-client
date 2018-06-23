import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { delay } from 'rxjs/operators';

@Pipe({
  name: 'appAsyncDelay'
})
export class AsyncDelayPipe implements PipeTransform {

  transform(source: Observable<any>, delayTime: number = 300): Observable<any> {
    return source.pipe(
      delay(delayTime)
    );
  }

}
