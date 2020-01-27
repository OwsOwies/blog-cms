import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, pluck, switchMap } from 'rxjs/operators';

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
import { BlogPostId } from '../models';
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

	public constructor(private actions$: Actions, private blogService: BlogRestService) {}
}
