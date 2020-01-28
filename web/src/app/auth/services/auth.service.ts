import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { User, UserRaw } from 'src/app/user/models';

import { Credentials, RegistrationValues } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthRestService {
	private API_URL = 'http://localhost:1343';
	public constructor(private readonly http: HttpClient) {}

	public login(credentials: Credentials): Observable<User> {
		return this.http.post<UserRaw>(`${this.API_URL}/login`, credentials).pipe(
			map(userRaw => User.parse(userRaw)),
		);
	}

	public register(values: RegistrationValues): Observable<void> {
		console.log('register', values)
		return this.http.post<void>(`${this.API_URL}/register`, values);
	}
}
