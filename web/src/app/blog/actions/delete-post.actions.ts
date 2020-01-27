import { Action } from '@ngrx/store';
import { ErrorAction } from 'src/app/common/actions/error.action';

import { BlogPostId } from '../models';

export enum DeletePostActionType {
	DELETE = '[BLOG] delete post',
	DELETE_SUCCESS = '[BLOG] delete post success',
}

export class DeletePost implements Action {
	public readonly type = DeletePostActionType.DELETE;
	public constructor(public readonly payload: BlogPostId) {}
}

export class DeletePostSuccess implements Action {
	public readonly type = DeletePostActionType.DELETE_SUCCESS;
	public constructor(public readonly payload: BlogPostId) {}
}

export class DeletePostError extends ErrorAction {}

export type DeletePostAction = DeletePost | DeletePostSuccess | DeletePostError;
