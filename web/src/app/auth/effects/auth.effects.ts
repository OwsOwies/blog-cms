import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, pluck, switchMap, take, tap } from 'rxjs/operators';
import { getUser } from 'src/app/reducer/application.selectors';

import { Login, LoginActionType, LoginError, LoginSuccess } from '../actions/login.actions';
import {
	Register,
	RegisterActionType,
	RegisterError,
	RegisterSuccess,
} from '../actions/register.actions';
import { Credentials, RegistrationValues } from '../models';
import { AuthRestService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
	@Effect()
	public readonly login$ = this.actions$.pipe(
		ofType<Login>(LoginActionType.LOGIN),
		pluck<Login, Credentials>('payload'),
		switchMap(credentials =>
			this.authService.login(credentials).pipe(
				map(user => new LoginSuccess(user)),
				catchError(err => of(new LoginError(err))),
			),
		),
	);

	@Effect({ dispatch: false })
	public readonly loginSuccess$ = this.actions$.pipe(
		ofType<LoginSuccess>(LoginActionType.LOGIN_SUCCESS),
		switchMap(() => this.store.select(getUser).pipe(take(1))),
		tap(user => this.router.navigate([`blog/${user.visibleName}`])),
	);

	@Effect()
	public readonly register$ = this.actions$.pipe(
		ofType<Register>(RegisterActionType.REGISTER),
		pluck<Register, RegistrationValues>('payload'),
		switchMap(values =>
			this.authService.register(values).pipe(
				map(() => new RegisterSuccess()),
				catchError(err => of(new RegisterError(err))),
			),
		),
	);

	public constructor(
		private actions$: Actions,
		private authService: AuthRestService,
		private router: Router,
		private store: Store<{}>,
	) {}
}
