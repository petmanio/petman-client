import * as Masonry from 'masonry-layout';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { debounce } from 'lodash';

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasonryComponent implements OnInit, AfterViewChecked, OnDestroy {
  @Input() options: Masonry.Options;
  private instance: Masonry;
  private reloadItems: Function;
  private layout: Function;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
    this.instance = new Masonry(this.el.nativeElement, this.options);
    this.reloadItems = debounce(this.instance.reloadItems.bind(this.instance));
    this.layout = debounce(this.instance.layout.bind(this.instance));
    setTimeout(() => this.renderer.setStyle(this.el.nativeElement, 'visibility', 'visible'), 300);
  }

  ngAfterViewChecked(): void {
    if (this.instance) {
      this.reloadItems(300);
      this.layout(300);
    }
  }

  ngOnDestroy(): void {
    if (this.instance) {
      this.instance.destroy();
    }
  }
}
