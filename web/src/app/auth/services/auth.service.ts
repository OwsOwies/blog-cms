import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { User } from 'src/app/user/models';

import { Credentials, RegistrationValues } from '../models';

@Injectable()
export class AuthRestService {
	public constructor(private readonly http: HttpClient) {}

	public login(_credentials: Credentials): Observable<User> {
		return of(
			User.parse({
				bio: 'some bio',
				contact: 'some contact',
				isAdmin: false,
				login: 'some login',
				password: 'some pass',
				posts: [],
				visibleName: 'some visible name',
			}),
		);
	}

	public register(values: RegistrationValues): Observable<void> {
		return of(undefined);
	}
}
