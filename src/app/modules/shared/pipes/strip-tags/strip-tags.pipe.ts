import { Pipe, PipeTransform } from '@angular/core';

import { UtilService } from '../../services/util/util.service';

@Pipe({ name: 'appStripTags' })
export class StripTagsPipe implements PipeTransform {
  transform(html: string) {
    return UtilService.stripHtml(html);
  }
}
