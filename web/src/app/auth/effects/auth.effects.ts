import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, pluck, switchMap } from 'rxjs/operators';

import { Login, LoginActionType, LoginError, LoginSuccess } from '../actions/login.actions';
import { Credentials } from '../models';
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

	public constructor(private actions$: Actions, private authService: AuthRestService) {}
}
