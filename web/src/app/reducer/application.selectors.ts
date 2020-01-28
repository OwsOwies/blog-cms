import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State } from './application.reducer';

export const selectState = createFeatureSelector<State>('state');

export const getBlogPosts = createSelector(selectState, state => state.posts);

export const getUser = createSelector(selectState, state => state.user);

export const getEditedPost = createSelector(selectState, state => state.editedPost);

export const getBiography = createSelector(selectState, state => state.bio);
