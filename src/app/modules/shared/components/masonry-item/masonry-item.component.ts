import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  AfterContentInit
} from '@angular/core';

@Component({
  selector: 'app-masonry-item',
  templateUrl: './masonry-item.component.html',
  styleUrls: ['./masonry-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasonryItemComponent implements AfterContentInit {
  static WAIT_TIMEOUT = 300;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterContentInit() {
    setTimeout(
      () =>
        this.renderer.addClass(this.el.nativeElement, 'pm-masonry-item-loaded'),
      MasonryItemComponent.WAIT_TIMEOUT
    );
  }
}
