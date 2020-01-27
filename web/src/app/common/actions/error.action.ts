import { Action } from '@ngrx/store';

export const errorActionType = '[COMMON] error';

export abstract class ErrorAction implements Action {
	public readonly type = errorActionType;
	public constructor(public readonly payload: string) {}
}
