import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Register } from '../../actions/register.actions';
import { RegistrationValues } from '../../models';

@Component({
	selector: 'app-register-page',
	styleUrls: ['./register-page.component.scss'],
	templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
	public constructor(private readonly store: Store<{}>) {}

	public onRegister(values: RegistrationValues): void {
		this.store.dispatch(new Register(values));
	}
}
