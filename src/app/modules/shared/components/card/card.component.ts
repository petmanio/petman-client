import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Config {
  avatar?: string;
  title: string;
  subtitle: string;
  image?: string;
  content?: string;
  price?: number;
  contentHTML?: string;
  chips?: { color: string, text: string }[];
  actions?: boolean;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() config: Config = <Config>{};
  @Output() onShare = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onShareLocal($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.onShare.emit();
  }

}
