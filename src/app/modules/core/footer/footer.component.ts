import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ILang } from '@translate/translate.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  @Input() currentLanguage: string;
  @Input() languages: ILang;
  @Output() changeLanguage = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
