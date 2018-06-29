import { AfterViewChecked, Component, Inject, Input, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Slider, SliderOptions } from 'materialize-css';

export interface SlideConfig {
  src: string;
}

@Component({
  selector: 'app-mz-slider',
  templateUrl: './mz-slider.component.html',
  styleUrls: ['./mz-slider.component.scss']
})
export class MzSliderComponent implements OnInit, AfterViewChecked {
  @Input() slides: SlideConfig[] = [];
  @Input() options?: Partial<SliderOptions> = {};
  private instances: Slider[] = [];

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    this.instances = Slider.init(this.document.querySelectorAll('.slider'), this.options);
  }
}
