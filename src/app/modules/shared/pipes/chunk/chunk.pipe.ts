import { Pipe, PipeTransform } from '@angular/core';
import { chunk } from 'lodash';

@Pipe({ name: 'appChunk' })
export class ChunkPipe implements PipeTransform {
  transform(arr: any[] = [], size: number = 3) {
    return chunk(arr, size);
  }
}
