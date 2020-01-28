import { Action } from '@ngrx/store';
import { ErrorAction } from 'src/app/common/actions/error.action';
import { BiographyValues } from 'src/app/user/models';

export enum LoadBiographyActionType {
	LOAD = '[BLOG] load biography',
	LOAD_SUCCESS = '[BLOG] load biography success',
}

export class LoadBiography implements Action {
	public readonly type = LoadBiographyActionType.LOAD;
	public constructor(public readonly payload: string) {}
}

export class LoadBiographySuccess implements Action {
	public readonly type = LoadBiographyActionType.LOAD_SUCCESS;
	public constructor(public readonly payload: BiographyValues) {}
}

export class LoadBiographyError extends ErrorAction {}

export type LoadBiographyAction = LoadBiography | LoadBiographySuccess | LoadBiographyError;
