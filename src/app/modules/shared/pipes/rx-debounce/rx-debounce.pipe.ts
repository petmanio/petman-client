import { Pipe, PipeTransform } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Pipe({ name: 'appRxDebounce' })
export class RxDebouncePipe implements PipeTransform {
  transform(source: Observable<any>, delayTime: number = 300): Observable<any> {
    return source.pipe(debounceTime(delayTime));
  }
}
