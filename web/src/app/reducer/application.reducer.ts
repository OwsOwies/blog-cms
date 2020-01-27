import { ActionReducerMap } from '@ngrx/store';
import { List } from 'immutable';

import { LoginAction, LoginActionType } from '../auth/actions/login.actions';
import { DeletePostAction, DeletePostActionType } from '../blog/actions/delete-post.actions';
import { LoadPostsAction, LoadPostsActionsType } from '../blog/actions/load-posts.actions';
import { BlogPost } from '../blog/models';
import { User } from '../user/models';

export interface ApplicationState {
	state: State;
}

export type AppAction = LoginAction | LoadPostsAction | DeletePostAction;

export const reducers: ActionReducerMap<ApplicationState, AppAction> = {
	state: reducer,
};

export interface State {
	posts: List<BlogPost>;
	user: User | null;
}

const initialState: State = {
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
		default:
			return state;
	}
}
