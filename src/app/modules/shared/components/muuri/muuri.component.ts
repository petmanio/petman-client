import { AfterViewChecked, AfterViewInit, Component, ContentChildren, ElementRef, QueryList } from '@angular/core';

import { MuuriItemComponent } from '../muuri-item/muuri-item.component';

const Murri = require('muuri');

@Component({
  selector: 'app-muuri',
  templateUrl: './muuri.component.html',
  styleUrls: ['./muuri.component.scss'],
})
export class MuuriComponent implements AfterViewInit, AfterViewChecked {
  @ContentChildren(MuuriItemComponent, { read: ElementRef }) items: QueryList<ElementRef>;
  private muuriInstance: any;

  constructor(private el: ElementRef) {
  }

  get itemElements(): any {
    return this.items.toArray().map(el => el.nativeElement);
  }

  ngAfterViewInit(): void {
    this.muuriInstance = new Murri(this.el.nativeElement, { items: this.itemElements });
  }

  ngAfterViewChecked(): void {
    if (this.muuriInstance) {
      this.muuriInstance.add(this.itemElements);
    }
  }
}
