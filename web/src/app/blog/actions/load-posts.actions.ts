import { Action } from '@ngrx/store';
import { ErrorAction } from 'src/app/common/actions/error.action';

import { BlogPost } from '../models';

export enum LoadPostsActionsType {
	LOAD = '[BLOG] load posts',
	LOAD_SUCCESS = '[BLOG] load posts success',
}

export class LoadPosts implements Action {
	public readonly type = LoadPostsActionsType.LOAD;
	public constructor(public readonly payload: string) {}
}

export class LoadPostsSuccess implements Action {
	public readonly type = LoadPostsActionsType.LOAD_SUCCESS;
	public constructor(public readonly payload: BlogPost[]) {}
}

export class LoadPostsError extends ErrorAction {}

export type LoadPostsAction = LoadPosts | LoadPostsSuccess | LoadPostsError;
