import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MetaService } from '@ngx-meta/core';
import { StripTagsPipe } from 'ngx-pipes';

import { ModalSize, ShelterDto } from '@petman/common';

import * as fromShelter from '@shelter/reducers';
import { environment } from '@environments/environment';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';
import { SlideConfig } from '@material/components/mz-slider/mz-slider.component';
import { Select } from '@shelter/actions/shelter.actions';

@Component({
  selector: 'app-shelter-details-page',
  templateUrl: './shelter-details-page.component.html',
  styleUrls: ['./shelter-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShelterDetailsPageComponent implements OnInit, OnDestroy {
  shelter: ShelterDto;
  shelter$ = this.store.pipe(select(fromShelter.getSelected));
  slides: SlideConfig[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromShelter.State>,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private meta: MetaService,
    private stripTagsPipe: StripTagsPipe,
    @Inject(DOCUMENT) private document: Document
  ) {
    const paramsSubscription = route.params
      .pipe(map(params => new Select(params.id)))
      .subscribe(store);

    const shelterSubscription = this.shelter$.subscribe(shelter => {
      this.shelter = shelter;

      if (this.shelter) {
        this.slides = this.shelter.images.map(img => ({ src: img }));

        this.meta.setTag('og:description', this.stripTagsPipe.transform(this.shelter.description));
        this.meta.setTag('og:image', environment.origin + this.shelter.images[0]);
      }
    });

    this.subscriptions.push(...[paramsSubscription, shelterSubscription]);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onShare() {
    const url = this.document.location.origin + this.router.createUrlTree(['shelters', this.shelter.id]).toString();
    const _dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    _dialogRef.afterClosed().subscribe(shareOptions => {
    });
  }
}
