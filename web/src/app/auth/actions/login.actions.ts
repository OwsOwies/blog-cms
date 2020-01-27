import { Action } from '@ngrx/store';
import { ErrorAction } from 'src/app/common/actions/error.action';

import { Credentials } from '../models';

export enum LoginActionType {
	LOGIN = '[AUTH] login',
	LOGIN_SUCCESS = '[AUTH] login success',
}

export class Login implements Action {
	public readonly type = LoginActionType.LOGIN;
	public constructor(public payload: Credentials) {}
}

export class LoginSuccess implements Action {
	public readonly type = LoginActionType.LOGIN_SUCCESS;
	public constructor(public readonly payload: {}) {}
}

export class LoginError extends ErrorAction {}

export type LoginAction = Login | LoginSuccess | LoginError;
