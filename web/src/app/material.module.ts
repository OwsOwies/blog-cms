import { NgModule } from '@angular/core';
import {
	MatButtonModule,
	MatCardModule,
	MatIconModule,
	MatInputModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatRippleModule,
} from '@angular/material';

@NgModule({
	exports: [
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatInputModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatRippleModule,
	],
	imports: [
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatInputModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatRippleModule,
	],
})
export class MaterialModule {}
