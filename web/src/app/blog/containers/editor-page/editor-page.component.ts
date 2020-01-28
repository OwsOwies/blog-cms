import { Component, OnDestroy } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { select, Store } from '@ngrx/store';
import { getEditedPost } from 'src/app/reducer/application.selectors';

import { AddPost } from '../../actions/add-post.actions';
import { EditPost } from '../../actions/edit-post.action';
import { BlogPost } from '../../models';

@Component({
	selector: 'app-editor-page',
	templateUrl: './editor-page.component.html',
})
export class EditorPageComponent implements OnDestroy {
	private readonly defaultEditorContent = '<p>Place post content here</p>';

	public Editor = ClassicEditor;
	public model = {
		editorData: this.defaultEditorContent,
	};

	public editedPost: BlogPost | null;
	public editedPostSubscription = this.store
		.pipe(select(getEditedPost))
		.subscribe(editedPost => {
				this.model.editorData = editedPost ? editedPost.content : this.defaultEditorContent;
				this.editedPost = editedPost;
		});

	public constructor(private readonly store: Store<{}>) {}

	public onSubmit(): void {
		if (this.editedPost) {
			this.store.dispatch(new EditPost({ ...this.editedPost, content: this.model.editorData }))
		} else {
			this.store.dispatch(new AddPost({ date: new Date(), content: this.model.editorData, ID: 0 }));
		}
	}

	public ngOnDestroy(): void {
		this.editedPostSubscription.unsubscribe();
	}
}
