import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { BlogPost } from '../models';

@Injectable()
export class BlogRestService {
	public constructor(private http: HttpClient) {}

	public getBlogPosts(visibleName: string): Observable<BlogPost[]> {
		// tslint:disable-next-line no-console
		console.log(visibleName);
		return of([
			{ date: '13-01-2020', content: 'some content' },
			{ date: '14-01-2020', content: 'some content 2' },
			{ date: '15-01-2020', content: 'some content 3' },
		]);
	}
}
