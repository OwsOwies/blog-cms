import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './application.reducer';

export const selectState = createFeatureSelector<State>('state');

export const getBlogPosts = createSelector(selectState, state => state.posts);

export const getUser = createSelector(selectState, state => state.user);
