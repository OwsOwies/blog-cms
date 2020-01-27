import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './containers/login-page/login-page.component';

@NgModule({
	declarations: [LoginPageComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		StoreModule.forFeature('auth', {}),
		EffectsModule.forFeature([]),
	],
	providers: [],
})
export class AuthModule {}
