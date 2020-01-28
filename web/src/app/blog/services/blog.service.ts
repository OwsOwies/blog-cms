import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { BiographyValues } from 'src/app/user/models';

import { BlogPost, BlogPostId } from '../models';

@Injectable()
export class BlogRestService {
	private API_URL = 'http://localhost:1343';
	public constructor(private http: HttpClient) {}

	public getBlogPosts(userId: string): Observable<BlogPost[]> {
		return this.http.get<BlogPost[]>(`${this.API_URL}/posts/${userId}`);
	}

	public deleteBlogPost(id: BlogPostId): Observable<void> {
		return this.http.delete<void>(`${this.API_URL}/posts/${id}`);
	}

	public addBlogPost(post: BlogPost, userId: number): Observable<void> {
		return this.http.post<void>(`${this.API_URL}/posts/${userId}`, post);
	}

	public updateBlogPost(post: BlogPost): Observable<void> {
		return this.http.put<void>(`${this.API_URL}/posts/${post.ID}`, post)
	}

	public getBiography(visibleName: string): Observable<BiographyValues> {
		return this.http.get<BiographyValues>(`${this.API_URL}/users/${visibleName}`);
	}

	public editBiography(values: BiographyValues, userId: number): Observable<void> {
		return this.http.put<void>(`${this.API_URL}/users/${userId}`, values);
	}
}
