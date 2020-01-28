import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BiographyValues, User } from 'src/app/user/models';

@Component({
	selector: 'app-bio-form',
	styleUrls: ['./bio-form.component.scss'],
	templateUrl: './bio-form.component.html',
})
export class BioFormComponent {
	public readonly formModel = new FormGroup({
		bio: new FormControl(null),
		contact: new FormControl(null),
		visibleName: new FormControl(null, Validators.required),
	});

	@Input()
	public set initialValues(user: User | null) {
		if (user) {
			this.formModel.controls.bio.setValue(user.bio);
			this.formModel.controls.contact.setValue(user.contact);
			this.formModel.controls.visibleName.setValue(user.visibleName);
		}
	}

	@Output()
	public readonly changeBio = new EventEmitter<BiographyValues>();

	public onSubmit(): void {
		this.changeBio.emit(this.formModel.value);
	}
}
