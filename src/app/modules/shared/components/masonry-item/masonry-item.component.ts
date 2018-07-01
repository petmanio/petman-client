import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masonry-item',
  templateUrl: './masonry-item.component.html',
  styleUrls: ['./masonry-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasonryItemComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
