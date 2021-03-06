import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { MaterialModule } from './material.module';
import { reducers } from './reducer/application.reducer';
import { ErrorEffects } from './common/effects/error.effects';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		AuthModule,
		BlogModule,
		EffectsModule.forRoot([ErrorEffects]),
		HttpClientModule,
		MaterialModule,
		StoreModule.forRoot(reducers),
		StoreDevtoolsModule.instrument({
			logOnly: true,
			maxAge: 10,
		}),
	],
	providers: [],
})
export class AppModule {}
