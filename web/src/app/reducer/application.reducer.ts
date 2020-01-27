import { ActionReducerMap } from '@ngrx/store';

import { LoginAction, LoginActionType } from '../auth/actions/login.actions';
import { User } from '../user/models';

export interface ApplicationState {
	state: State;
}

export const reducers: ActionReducerMap<ApplicationState, LoginAction> = {
	state: reducer,
};

interface State {
	user: User | null;
}

const initialState: State = {
	user: null,
};

export function reducer(state: State = initialState, action: LoginAction): State {
	switch (action.type) {
		case LoginActionType.LOGIN_SUCCESS:
			return { ...state, user: action.payload };
		default:
			return state;
	}
}
