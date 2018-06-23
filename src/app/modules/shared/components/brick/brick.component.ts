import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import Bricks, { BricksInstance } from 'bricks.js';

const sizes = [
  { columns: 2, gutter: 0 },
  { mq: '768px', columns: 3, gutter: 0 },
  { mq: '1024px', columns: 4, gutter: 0 }
];

@Component({
  selector: 'app-brick',
  templateUrl: './brick.component.html',
  styleUrls: ['./brick.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrickComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('brick') brick: ElementRef;
  private instance: BricksInstance;
  private inProgress = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.update();
  }

  ngAfterViewChecked(): void {
    this.update();
  }

  private initiate(): void {
    this.inProgress = true;
    this.renderer.setStyle(this.brick.nativeElement, 'visibility', 'hidden');
    this.instance = Bricks({
      container: this.brick.nativeElement,
      sizes: sizes,
      packed: 'data-packed',
    });

    setTimeout(() => {
      this.instance.resize(true).pack();
      this.inProgress = false;
      this.renderer.setStyle(this.brick.nativeElement, 'visibility', 'visible');
    }, 500);
  }

  private update(): void {
    if (!this.inProgress) {
      if (!this.instance) {
        return this.initiate();
      }
      this.instance.update();
    }
  }
}
