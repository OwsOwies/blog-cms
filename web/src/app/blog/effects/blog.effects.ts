import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { catchError, map, pluck, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
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
	LoadBiography,
	LoadBiographyActionType,
	LoadBiographyError,
	LoadBiographySuccess,
} from '../actions/load-biography.actions';
import {
	LoadPosts,
	LoadPostsActionsType,
	LoadPostsError,
	LoadPostsSuccess,
} from '../actions/load-posts.actions';
import { OpenPostEditor, OpenPostEditorActionType } from '../actions/open-post-editor';
import { BlogPost, BlogPostId } from '../models';
import { BlogRestService } from '../services/blog.service';
import { EditBiography, EditBiographyActionType, EditBiographySuccess, EditBiographyError } from '../actions/edit-biography.actions';
import { BiographyValues } from 'src/app/user/models';
import { EditPost, EditPostActionType, EditPostSuccess, EditPostError } from '../actions/edit-post.action';

@Injectable()
export class BlogEffects {
	private tupleWithLatestFrom = <T, S>(selector$: Observable<S>) => (
		in$: Observable<T>,
	): Observable<[T, S]> =>
		in$.pipe(withLatestFrom(selector$, (input: T, fromSelector: S) => [input, fromSelector])); 

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
		this.tupleWithLatestFrom(this.store.pipe(select(getUser))),
		switchMap(([post, user]) =>
			this.blogService.addBlogPost(post, user.ID).pipe(
				map(() => new AddPostSuccess(post)),
				catchError(err => of(new AddPostError(err))),
			),
		),
	);

	@Effect({ dispatch: false })
	public readonly postSubmitSuccess$ = this.actions$.pipe(
		ofType<AddPostSuccess | EditPostSuccess>(
			AddPostActionType.ADD_SUCCESS,
			EditPostActionType.EDIT_SUCCESS
		),
		switchMap(() => this.store.select(getUser).pipe(take(1))),
		tap(user => this.router.navigate([`blog/${user.visibleName}`])),
	);

	@Effect({ dispatch: false })
	public readonly openPostEditor$ = this.actions$.pipe(
		ofType<OpenPostEditor>(OpenPostEditorActionType),
		tap(() => this.router.navigate(['editor'])),
	);

	@Effect()
	public readonly getBiography$ = this.actions$.pipe(
		ofType<LoadBiography>(LoadBiographyActionType.LOAD),
		pluck<LoadBiography, string>('payload'),
		switchMap(blogName =>
			this.blogService.getBiography(blogName).pipe(
				map(bio => new LoadBiographySuccess(bio)),
				catchError(err => of(new LoadBiographyError(err))),
			),
		),
	);
	
	@Effect()
	public readonly editBiography$ = this.actions$.pipe(
		ofType<EditBiography>(EditBiographyActionType.EDIT),
		pluck<EditBiography, BiographyValues>('payload'),
		switchMap(bioValues => this.blogService.editBiography(bioValues).pipe(
			map(() => new EditBiographySuccess(bioValues)),
			catchError(err => of(new EditBiographyError(err))),
		))
	);

	@Effect({ dispatch: false })
	public readonly editBiographySuccess$ = this.actions$.pipe(
		ofType<EditBiographySuccess>(EditBiographyActionType.EDIT_SUCCESS),
		pluck<EditBiographySuccess, BiographyValues>('payload'),
		tap(values => this.router.navigate([`blog/${values.visibleName}`]))
	)

	@Effect()
	public readonly editBlogPost$ = this.actions$.pipe(
		ofType<EditPost>(EditPostActionType.EDIT),
		pluck<EditPost, BlogPost>('payload'),
		switchMap(post => this.blogService.updateBlogPost(post).pipe(
			map(() => new EditPostSuccess(post)),
			catchError(err => of(new EditPostError(err))),
		))
	)

	public constructor(
		private actions$: Actions,
		private blogService: BlogRestService,
		private router: Router,
		private store: Store<{}>,
	) {}
}
