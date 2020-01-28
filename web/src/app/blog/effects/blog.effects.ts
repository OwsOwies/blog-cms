import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, pluck, switchMap, take, tap } from 'rxjs/operators';
import { getUser } from 'src/app/reducer/application.selectors';

import {
	AddPost,
	AddPostActionType,
	AddPostError,
	AddPostSuccess,
} from '../actions/add-post.actions';
import {
	DeletePost,
	DeletePostActionType,
	DeletePostError,
	DeletePostSuccess,
} from '../actions/delete-post.actions';
import {
	LoadPosts,
	LoadPostsActionsType,
	LoadPostsError,
	LoadPostsSuccess,
} from '../actions/load-posts.actions';
import { OpenPostEditor, OpenPostEditorActionType } from '../actions/open-post-editor';
import { BlogPost, BlogPostId } from '../models';
import { BlogRestService } from '../services/blog.service';

@Injectable()
export class BlogEffects {
	@Effect()
	public readonly getBlogPosts$ = this.actions$.pipe(
		ofType<LoadPosts>(LoadPostsActionsType.LOAD),
		pluck<LoadPosts, string>('payload'),
		switchMap(visibleName =>
			this.blogService.getBlogPosts(visibleName).pipe(
				map(posts => new LoadPostsSuccess(posts)),
				catchError(err => of(new LoadPostsError(err))),
			),
		),
	);

	@Effect()
	public readonly deleteBlogPost$ = this.actions$.pipe(
		ofType<DeletePost>(DeletePostActionType.DELETE),
		pluck<DeletePost, BlogPostId>('payload'),
		switchMap(id =>
			this.blogService.deleteBlogPost(id).pipe(
				map(() => new DeletePostSuccess(id)),
				catchError(err => of(new DeletePostError(err))),
			),
		),
	);

	@Effect()
	public readonly addBlogPost$ = this.actions$.pipe(
		ofType<AddPost>(AddPostActionType.ADD),
		pluck<AddPost, BlogPost>('payload'),
		switchMap(post =>
			this.blogService.addBlogPost(post, 'some user id mock').pipe(
				map(() => new AddPostSuccess(post)),
				catchError(err => of(new AddPostError(err))),
			),
		),
	);

	@Effect({ dispatch: false })
	public readonly addBlogPostSuccess$ = this.actions$.pipe(
		ofType<AddPostSuccess>(AddPostActionType.ADD_SUCCESS),
		switchMap(() => this.store.select(getUser).pipe(take(1))),
		tap(user => this.router.navigate([`blog/${user.visibleName}`])),
	);

	@Effect({ dispatch: false })
	public readonly openPostEditor$ = this.actions$.pipe(
		ofType<OpenPostEditor>(OpenPostEditorActionType),
		tap(() => this.router.navigate(['editor'])),
	);

	public constructor(
		private actions$: Actions,
		private blogService: BlogRestService,
		private router: Router,
		private store: Store<{}>,
	) {}
}
