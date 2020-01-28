import { Action } from '@ngrx/store';
import { ErrorAction } from 'src/app/common/actions/error.action';

import { BlogPost } from '../models';

export enum AddPostActionType {
	ADD = '[BLOG] add post',
	ADD_SUCCESS = '[BLOG] add post success',
}

export class AddPost implements Action {
	public readonly type = AddPostActionType.ADD;
	public constructor(public readonly payload: BlogPost) {}
}

export class AddPostSuccess implements Action {
	public readonly type = AddPostActionType.ADD_SUCCESS;
	public constructor(public readonly payload: BlogPost) {}
}

export class AddPostError extends ErrorAction {}

export type AddPostAction = AddPost | AddPostSuccess | AddPostError;
