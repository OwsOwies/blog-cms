import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Credentials } from '../../models';

@Component({
	selector: 'app-login-form',
	styleUrls: ['./login-form.component.scss'],
	templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
	public readonly formModel = new FormGroup({
		login: new FormControl(null, Validators.required),
		password: new FormControl(null, Validators.required),
	});

	@Output()
	public readonly signIn = new EventEmitter<Credentials>();

	public onSubmit(): void {
		this.signIn.emit(this.formModel.value);
	}
}
