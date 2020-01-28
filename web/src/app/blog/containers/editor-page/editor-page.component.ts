import { Component, OnDestroy } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { select, Store } from '@ngrx/store';
import { getEditedPost } from 'src/app/reducer/application.selectors';

import { AddPost } from '../../actions/add-post.actions';

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

	public editedPostSubscription = this.store
		.pipe(select(getEditedPost))
		.subscribe(
			editedPost =>
				(this.model.editorData = editedPost ? editedPost.content : this.defaultEditorContent),
		);

	public constructor(private readonly store: Store<{}>) {}

	public onSubmit(): void {
		this.store.dispatch(new AddPost({ date: new Date(), content: this.model.editorData, id: '' }));
	}

	public ngOnDestroy(): void {
		this.editedPostSubscription.unsubscribe();
	}
}
