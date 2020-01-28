import { Action } from '@ngrx/store';
import { BlogPost } from '../models';
import { ErrorAction } from 'src/app/common/actions/error.action';

export enum EditPostActionType {
	EDIT = '[BLOG] edit post',
	EDIT_SUCCESS = '[BLOG] edit post success',
}

export class EditPost implements Action {
	public readonly type = EditPostActionType.EDIT;
	public constructor(public readonly payload: BlogPost) {}
}

export class EditPostSuccess implements Action {
	public readonly type = EditPostActionType.EDIT_SUCCESS;
	public constructor(public readonly payload: BlogPost) {}
}

export class EditPostError extends ErrorAction {}

export type EditPostAction = EditPost | EditPostSuccess | EditPostError;
