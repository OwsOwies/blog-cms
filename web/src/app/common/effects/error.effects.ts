import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { errorActionType } from '../actions/error.action';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorEffects {
	@Effect({ dispatch: false })
	public readonly showError$ = this.actions$.pipe(
		ofType(errorActionType),
		tap(() => this.snackbar.open(
			"Error occured please try again",
			undefined,
			Object.assign(new MatSnackBarConfig(), {
				duration: 3000,
			}),
		)),
	)

	public constructor(private actions$: Actions, private snackbar: MatSnackBar) {}
}