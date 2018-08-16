import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GALLERY_CONF, GALLERY_IMAGE, NgxImageGalleryComponent } from 'ngx-image-gallery';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GalleryComponent implements OnInit, OnDestroy {
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
  private interval;

  constructor(private ref: ChangeDetectorRef, @Inject(PLATFORM_ID) protected platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // FIXME: workaround because library not detecting image clide change
      this.interval = setInterval(() => this.ref.markForCheck(), 1000);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      clearInterval(this.interval);
    }
  }

  galleryInlineImageClicked(index: number) {
    this.fullscreen = true;
    this.ngxImageGallery.open(index);
  }

  galleryInlineImageChange(index: number) {
    this.index = index;
  }

  galleryImageChange(index: number) {
    this.index = index;
  }

  galleryClose() {
    this.ngxImageGalleryInline.open(this.index);
    this.fullscreen = false;
  }
}
