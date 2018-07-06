import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromShelter from '@shelter/reducers';
import { Create } from '@shelter/actions/shelter.actions';
import { SharedService } from '@shared/services/shared/shared.service';

@Component({
  selector: 'app-shelter-add-page',
  templateUrl: './shelter-add-page.component.html',
  styleUrls: ['./shelter-add-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShelterAddPageComponent implements OnInit {
  form: FormGroup;
  quillModules = SharedService.quillModules;
  pending$ = this.store.select(fromShelter.getShelterAddPagePending);
  error$ = this.store.select(fromShelter.getShelterAddPageError);

  constructor(@Inject(FormBuilder) private formBuilder: FormBuilder, private store: Store<fromShelter.State>) {
    this.form = formBuilder.group({
      price: ['', Validators.required],
      description: ['', Validators.compose([Validators.required, Validators.minLength(200), Validators.maxLength(1000)])],
      images: [
        null,
        Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(4)])
      ]
    });
  }

  ngOnInit() {
  }

  create() {
    this.store.dispatch(new Create(this.form.value));
  }
}
