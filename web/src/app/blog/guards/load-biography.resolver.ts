import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';

import { LoadBiography } from '../actions/load-biography.actions';

export class LoadBiographyResolver implements Resolve<boolean> {
	public constructor(private readonly store: Store<{}>) {}

	public resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
		const visibleName = route.paramMap.get('name');
		this.store.dispatch(new LoadBiography(visibleName));
		return of(true);
	}
}
