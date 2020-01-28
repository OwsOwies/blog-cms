import { Component, Input } from '@angular/core';
import { BiographyValues } from 'src/app/user/models';

@Component({
	selector: 'app-bio',
	styleUrls: ['./bio.component.scss'],
	templateUrl: './bio.component.html',
})
export class BioComponent {
	@Input()
	public bio: BiographyValues | null;
}
