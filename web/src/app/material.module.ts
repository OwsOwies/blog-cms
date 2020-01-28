import { NgModule } from '@angular/core';
import {
	MatButtonModule,
	MatCardModule,
	MatIconModule,
	MatInputModule,
	MatPaginatorModule,
	MatProgressBarModule,
	MatRippleModule,
	MatSnackBarModule,
} from '@angular/material';

@NgModule({
	exports: [
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatInputModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatSnackBarModule,
		MatRippleModule,
	],
	imports: [
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatInputModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatSnackBarModule,
		MatRippleModule,
	],
})
export class MaterialModule {}
