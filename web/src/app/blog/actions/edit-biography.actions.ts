import { Action } from '@ngrx/store';
import { BiographyValues } from 'src/app/user/models';
import { ErrorAction } from 'src/app/common/actions/error.action';

export enum EditBiographyActionType {
	EDIT = '[BLOG] edit biography',
	EDIT_SUCCESS = '[BLOG] edit biography success',
}

export class EditBiography implements Action {
	public readonly type = EditBiographyActionType.EDIT;
	public constructor(public readonly payload: BiographyValues) {}
}

export class EditBiographySuccess implements Action {
	public readonly type = EditBiographyActionType.EDIT_SUCCESS;
	public constructor(public readonly payload: BiographyValues) {}
}

export class EditBiographyError extends ErrorAction {}

export type EditBiographyAction = EditBiography | EditBiographySuccess | EditBiographyError;
