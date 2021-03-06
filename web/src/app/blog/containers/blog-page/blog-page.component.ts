import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { getBiography, getBlogPosts, getUser } from 'src/app/reducer/application.selectors';
import { User } from 'src/app/user/models';

import { DeletePost } from '../../actions/delete-post.actions';
import { OpenPostEditor } from '../../actions/open-post-editor';
import { BlogPost } from '../../models';

@Component({
	selector: 'app-blog-page',
	styleUrls: ['./blog-page.component.scss'],
	templateUrl: './blog-page.component.html',
})
export class BlogPageComponent implements OnDestroy {
	public readonly blogPosts$ = this.store.pipe(select(getBlogPosts));

	public user: User | null;
	public readonly userSubscription = this.store
		.pipe(select(getUser))
		.subscribe(user => (this.user = user));

	public readonly bio$ = this.store.pipe(select(getBiography));

	public readonly pageSize = 10;
	public readonly pageSizeOptions = [5, 10, 25];
	public blogName: string;

	public constructor(private readonly store: Store<{}>, private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {
		this.blogName = this.activatedRoute.snapshot.paramMap.get('name');
	}

	public get isBlogOwner(): boolean {
		return this.user && this.user.visibleName === this.blogName;
	}

	public onPostDelete(post: BlogPost): void {
		this.store.dispatch(new DeletePost(post.ID));
	}

	public onPostEdit(post: BlogPost): void {
		this.store.dispatch(new OpenPostEditor(post));
	}

	public onAddNewClick(): void {
		this.store.dispatch(new OpenPostEditor(null));
	}

	public onBioEditClick(): void {
		this.router.navigate(['editor-bio'])
	}

	public ngOnDestroy(): void {
		this.userSubscription.unsubscribe();
	}
}
