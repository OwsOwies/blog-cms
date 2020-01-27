import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './containers/login-page/login-page.component';
import { RegisterPageComponent } from './containers/register-page/register-page.component';

const routes: Routes = [
	{
		children: [
			{ path: '', redirectTo: 'login', pathMatch: 'full' },
			{ path: 'login', component: LoginPageComponent },
			{ path: 'register', component: RegisterPageComponent },
		],
		path: 'auth',
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
