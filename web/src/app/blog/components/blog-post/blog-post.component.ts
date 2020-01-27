import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BlogPost } from '../../models';

@Component({
	selector: 'app-blog-post',
	styleUrls: ['./blog-post.component.scss'],
	templateUrl: './blog-post.component.html',
})
export class BlogPostComponent {
	@Input()
	public post: BlogPost;

	@Input()
	public isEditable: boolean;

	@Output()
	public readonly edit = new EventEmitter<void>();

	@Output()
	public readonly delete = new EventEmitter<void>();

	public onEditClick(): void {
		this.edit.emit();
	}

	public onDeleteClick(): void {
		this.delete.emit();
	}
}
