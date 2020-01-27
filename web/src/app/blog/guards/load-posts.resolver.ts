import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';

import { LoadPosts } from '../actions/load-posts.actions';

export class LoadPostsResolver implements Resolve<boolean> {
	public constructor(private readonly store: Store<{}>) {}

	public resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
		const visibleName = route.paramMap.get('name');
		this.store.dispatch(new LoadPosts(visibleName));
		return of(true);
	}
}
