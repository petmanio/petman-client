import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Carousel, CarouselOptions } from 'materialize-css';

export interface CarouselConfig {
  src: string;
}

@Component({
  selector: 'app-mz-carousel',
  templateUrl: './mz-carousel.component.html',
  styleUrls: ['./mz-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MzCarouselComponent implements OnInit, AfterViewInit {
  @Input() carousels: CarouselConfig[] = [];
  @Input() options?: Partial<CarouselOptions> = {};
  private instance: Carousel;

  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private el: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initSlider();
  }

  private initSlider() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.instance = Carousel.init(this.el.nativeElement.querySelector('.carousel'), this.options), 1000);
    }
  }
}
