import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appGalleryImages'
})
export class GalleryImagesPipe implements PipeTransform {

  transform(images: string[], args?: any): any {
    return images.map(src => ({ small: src, medium: src, big: src }));
  }

}
