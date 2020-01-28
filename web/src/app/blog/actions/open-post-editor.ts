import { Action } from '@ngrx/store';

import { BlogPost } from '../models';

export const OpenPostEditorActionType = '[BLOG] open post editor';

export class OpenPostEditor implements Action {
	public readonly type = OpenPostEditorActionType;
	public constructor(public readonly payload: BlogPost | null) {}
}
