import { Action } from '@ngrx/store';
import { ErrorAction } from 'src/app/common/actions/error.action';

import { RegistrationValues } from '../models';

export enum RegisterActionType {
	REGISTER = '[AUTH] register',
	REGISTER_SUCCESS = '[AUTH] register success',
}

export class Register implements Action {
	public readonly type = RegisterActionType.REGISTER;
	public constructor(public payload: RegistrationValues) {}
}

export class RegisterSuccess implements Action {
	public readonly type = RegisterActionType.REGISTER_SUCCESS;
}

export class RegisterError extends ErrorAction {}

export type RegisterAction = Register | RegisterSuccess | RegisterError;
