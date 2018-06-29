import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { ModalSize, ShelterDto } from '@petman/common';

import * as fromShelter from '@shelter/reducers';
import { ShareDialogComponent } from '@shared/components/share-dialog/share-dialog.component';
import { SlideConfig } from '@material/components/mz-slider/mz-slider.component';
import { Select } from '@shelter/actions/shelter.actions';

@Component({
  selector: 'app-shelter-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsPageComponent implements OnInit, OnDestroy {
  shelter: ShelterDto;
  shelter$ = this.store.pipe(select(fromShelter.getSelected));
  private subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromShelter.State>,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {
    const paramsSubscription = route.params
      .pipe(map(params => new Select(params.id)))
      .subscribe(store);

    const shelterSubscription = this.shelter$.subscribe(shelter => this.shelter = shelter);

    this.subscriptions.push(...[paramsSubscription, shelterSubscription]);
  }

  get slides(): SlideConfig[] {
    return this.shelter.images.map(img => ({ src: img }));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onShare(): void {
    const url = this.document.location.origin + this.router.createUrlTree(['shelters', this.shelter.id]).toString();
    const _dialogRef = this.dialog.open(ShareDialogComponent, {
      width: ModalSize.MEDIUM,
      data: { url }
    });
    _dialogRef.afterClosed().subscribe(shareOptions => {
    });
  }
}
