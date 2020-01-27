import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { Credentials } from '../models';

@Injectable()
export class AuthRestService {
	public constructor(private readonly http: HttpClient) {}

	public login(credentials: Credentials): Observable<{}> {
		// tslint:disable-next-line no-console
		console.log(credentials);
		return of({});
	}
}
