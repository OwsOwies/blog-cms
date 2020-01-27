import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RegistrationValues } from '../../models';

@Component({
	selector: 'app-register-form',
	styleUrls: ['./register-form.component.scss'],
	templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
	public readonly formModel = new FormGroup({
		bio: new FormControl(null),
		contact: new FormControl(null),
		login: new FormControl(null, Validators.required),
		password: new FormControl(null, Validators.required),
		repeatedPassword: new FormControl(null, Validators.required),
		visibleName: new FormControl(null, Validators.required),
	});

	@Output()
	public readonly register = new EventEmitter<RegistrationValues>();

	public onSubmit(): void {
		if (this.formModel.controls.password.value !== this.formModel.controls.repeatedPassword.value) {
			return;
		}
		this.register.emit(this.formModel.value);
	}
}
