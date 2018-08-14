import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit {
  @Input()
  images: GALLERY_IMAGE[] = [];
  @ViewChild('ngxImageGallery')
  ngxImageGallery: NgxImageGalleryComponent;
  @ViewChild('ngxImageGalleryInline')
  ngxImageGalleryInline: NgxImageGalleryComponent;
  config: GALLERY_CONF = {
    imageOffset: '20px',
    showDeleteControl: false,
    showCloseControl: true,
    showExtUrlControl: false,
    reactToMouseWheel: false,
    inline: false,
    backdropColor: 'rgba(13,13,14,0.85)',
    showArrows: false
  };

  inlineConfig: GALLERY_CONF = {
    imageOffset: '20px',
    imagePointer: true,
    showDeleteControl: false,
    showCloseControl: false,
    showExtUrlControl: false,
    reactToMouseWheel: false,
    closeOnEsc: true,
    inline: true,
    backdropColor: 'default',
    showArrows: false
  };
  fullscreen = false;
  private index: number;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {}

  galleryInlineImageClicked(index: number) {
    this.fullscreen = true;
    this.ngxImageGallery.open(index);
    // FIXME: workaround because library not detecting image clide change
    setTimeout(() => this.ref.markForCheck(), 500);
  }

  galleryInlineImageChange(index: number) {
    this.index = index;
    setTimeout(() => this.ref.markForCheck(), 500);
  }

  galleryImageChange(index: number) {
    this.index = index;
    setTimeout(() => this.ref.markForCheck(), 500);
  }

  galleryClose() {
    this.ngxImageGalleryInline.open(this.index);
    this.fullscreen = false;
  }
}
