import { NgModule } from '@angular/core';
import {
	MatButtonModule,
	MatCardModule,
	MatIconModule,
	MatInputModule,
	MatProgressBarModule,
	MatRippleModule,
} from '@angular/material';

@NgModule({
	exports: [
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatInputModule,
		MatProgressBarModule,
		MatRippleModule,
	],
	imports: [
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatInputModule,
		MatProgressBarModule,
		MatRippleModule,
	],
})
export class MaterialModule {}
