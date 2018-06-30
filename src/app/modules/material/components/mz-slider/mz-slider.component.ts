import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Slider, SliderOptions } from 'materialize-css';

export interface SlideConfig {
  src: string;
}

@Component({
  selector: 'app-mz-slider',
  templateUrl: './mz-slider.component.html',
  styleUrls: ['./mz-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MzSliderComponent implements OnInit, AfterViewInit {
  @Input() slides: SlideConfig[] = [];
  @Input() options?: Partial<SliderOptions> = {};
  private instance: Slider;

  constructor(@Inject(PLATFORM_ID) protected platformId: Object, private el: ElementRef) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initSlider();
  }

  private initSlider() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.instance = Slider.init(this.el.nativeElement.querySelector('.slider'), this.options), 300);
    }
  }
}
