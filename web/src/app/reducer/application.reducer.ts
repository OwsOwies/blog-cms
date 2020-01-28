import { ActionReducerMap } from '@ngrx/store';
import { List } from 'immutable';

import { LoginAction, LoginActionType } from '../auth/actions/login.actions';
import { AddPostAction, AddPostActionType } from '../blog/actions/add-post.actions';
import { DeletePostAction, DeletePostActionType } from '../blog/actions/delete-post.actions';
import { LoadPostsAction, LoadPostsActionsType } from '../blog/actions/load-posts.actions';
import { OpenPostEditor, OpenPostEditorActionType } from '../blog/actions/open-post-editor';
import { BlogPost } from '../blog/models';
import { User } from '../user/models';

export interface ApplicationState {
	state: State;
}

export type AppAction =
	| LoginAction
	| LoadPostsAction
	| DeletePostAction
	| AddPostAction
	| OpenPostEditor;

export const reducers: ActionReducerMap<ApplicationState, AppAction> = {
	state: reducer,
};

export interface State {
	editedPost: BlogPost | null;
	posts: List<BlogPost>;
	user: User | null;
}

const initialState: State = {
	editedPost: null,
	posts: List(),
	user: null,
};

export function reducer(state: State = initialState, action: AppAction): State {
	switch (action.type) {
		case LoginActionType.LOGIN_SUCCESS:
			return { ...state, user: action.payload };

		case LoadPostsActionsType.LOAD_SUCCESS:
			return { ...state, posts: List(action.payload) };

		case DeletePostActionType.DELETE_SUCCESS:
			return {
				...state,
				posts: state.posts.remove(state.posts.findIndex(post => post.id === action.payload)),
			};

		case AddPostActionType.ADD_SUCCESS:
			return {
				...state,
				editedPost: null,
				posts: state.posts.unshift(action.payload),
			};

		case OpenPostEditorActionType:
			return {
				...state,
				editedPost: action.payload,
			};

		default:
			return state;
	}
}
