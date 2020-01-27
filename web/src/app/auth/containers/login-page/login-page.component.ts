import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Login } from '../../actions/login.actions';
import { Credentials } from '../../models';

@Component({
	selector: 'app-login-page',
	styleUrls: ['./login-page.component.scss'],
	templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
	public constructor(private store: Store<{}>) {}

	public onSignIn(credentials: Credentials): void {
		this.store.dispatch(new Login(credentials));
	}
}
