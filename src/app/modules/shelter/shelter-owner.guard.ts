import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import * as fromShelter from '@shelter/reducers';
import { ShelterService } from '@shelter/shelter.service';

@Injectable()
export class ShelterOwnerGuard implements CanActivate {
  constructor(private store: Store<fromShelter.State>, private router: Router, private shelterService: ShelterService) {
  }

  isOwner(id: number): Observable<boolean> {
    return this.store.select(fromShelter.getEntities)
      .pipe(
        filter(entities => !!entities[id]),
        map(entities => entities[id]),
        map(entity => entity && entity.isOwner),
        take(1)
      );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.isOwner(route.params['id'])
      .pipe(
        switchMap(isOwner => {
          if (isOwner) {
            return of(isOwner);
          }
          this.router.navigate(['/404']);
          return of(false);
        })
      );
  }
}
