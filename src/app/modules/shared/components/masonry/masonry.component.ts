import * as Macy from 'macy';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';

import { UtilService } from '@shared/services/util/util.service';

export interface MacyOptions {
  trueOrder: boolean;
  waitForImages: boolean;
  useOwnImageLoader: boolean;
  debug: boolean;
  mobileFirst: boolean;
  columns: number;
  margin: number;
  breakAt: {
    [width: number]: number;
  };
}

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasonryComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  static WAIT_TIMEOUT = 300;

  @Input() options: Partial<MacyOptions> = {};
  id = UtilService.randomHtmlId();
  instance: Macy;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    setTimeout(
      () =>
        this.renderer.setStyle(this.el.nativeElement, 'visibility', 'visible'),
      MasonryComponent.WAIT_TIMEOUT
    );
  }

  ngAfterViewInit() {
    this.instance = new Macy({
      container: `#${this.id}`,
      ...this.options
    });

    this.instance.recalculate(true);
    this.instance.recalculateOnImageLoad();
  }

  ngAfterViewChecked() {
    this.instance.recalculate(true);
    this.instance.recalculateOnImageLoad();
  }

  ngOnDestroy() {
    if (this.instance) {
      this.instance.remove();
    }
  }
}
