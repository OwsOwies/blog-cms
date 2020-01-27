import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { AuthEffects } from './effects/auth.effects';
import { AuthRestService } from './services/auth.service';

@NgModule({
	declarations: [LoginFormComponent, LoginPageComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		MaterialModule,
		ReactiveFormsModule,
		StoreModule.forFeature('auth', {}),
		EffectsModule.forFeature([AuthEffects]),
	],
	providers: [AuthRestService],
})
export class AuthModule {}
