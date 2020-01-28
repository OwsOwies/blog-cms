import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { BiographyValues } from 'src/app/user/models';

import { BlogPost, BlogPostId } from '../models';

@Injectable()
export class BlogRestService {
	public constructor(private http: HttpClient) {}

	public getBlogPosts(visibleName: string): Observable<BlogPost[]> {
		// tslint:disable-next-line no-console
		console.log(visibleName);
		return of([
			{ id: '1', date: new Date(), content: 'some content' },
			{ id: '2', date: new Date(), content: 'some content 2' },
			{ id: '3', date: new Date(), content: 'some content 3' },
		]);
	}

	public deleteBlogPost(id: BlogPostId): Observable<void> {
		// tslint:disable-next-line no-console
		console.log(id);
		return of(undefined);
	}

	public addBlogPost(post: BlogPost, userId: string): Observable<void> {
		// tslint:disable-next-line no-console
		console.log(post, userId);
		return of(undefined);
	}

	public getBiography(visibleName: string): Observable<BiographyValues> {
		// tslint:disable-next-line no-console
		console.log(visibleName);
		return of({ bio: 'some bio', contact: 'some contact', login: 'some login', visibleName });
	}

	public editBiography(values: BiographyValues): Observable<void> {
		// tslint:disable-next-line no-console
		console.log(values);
		return of(undefined);
	}
}
