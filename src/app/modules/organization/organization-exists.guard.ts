import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import * as fromOrganization from '@organization/reducers';
import { OrganizationService } from '@organization/organization.service';
import { LoadSuccess } from '@organization/actions/organization.actions';

@Injectable()
export class OrganizationExistsGuard implements CanActivate {
  constructor(private store: Store<fromOrganization.State>, private router: Router, private organizationService: OrganizationService) {
  }

  hasData(id: number): Observable<boolean> {
    return this.hasDataInStore(id)
      .pipe(
        switchMap(inStore => {
          if (inStore) {
            return of(inStore);
          }
          return this.hasDataInApi(id);
        })
      );
  }

  hasDataInStore(id: number): Observable<boolean> {
    return this.store.select(fromOrganization.getEntities)
      .pipe(
        map(entities => !!entities[id]),
        take(1)
      );
  }

  hasDataInApi(id: number): Observable<boolean> {
    return this.organizationService.getById(id)
      .pipe(
        map(entity => new LoadSuccess(entity)),
        tap((action: LoadSuccess) => this.store.dispatch(action)),
        map(organization => !!organization),
        catchError(() => {
          this.router.navigate(['/404']);
          return of(false);
        })
      );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.hasData(route.params['id']);
  }
}
