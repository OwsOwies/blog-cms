import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getUser } from 'src/app/reducer/application.selectors';
import { BiographyValues } from 'src/app/user/models';

@Component({
	selector: 'app-edit-bio-page',
	styleUrls: ['./edit-bio-page.component.scss'],
	templateUrl: './edit-bio-page.component.html',
})
export class EditBioPageComponent {
	public user$ = this.store.pipe(select(getUser));

	public constructor(private store: Store<{}>) {}

	public onBioChange(values: BiographyValues): void {
		// TODO
	}
}
