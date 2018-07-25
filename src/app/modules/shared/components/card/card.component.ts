import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Config {
  avatar?: string;
  title: string;
  subtitle?: string;
  image?: string;
  content?: string;
  contentFooter?: string;
  price?: number;
  actions?: {
    text?: string;
    tooltipText?: string;
    color?: 'primary' | 'accent' | 'warn';
    icon?: string;
  };
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() config: Config = <Config>{};
  @Output() actionClick = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }
}
