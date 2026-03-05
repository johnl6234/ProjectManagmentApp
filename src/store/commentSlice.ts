import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { RootState } from './index';
import type { Comment } from '../types/comment';

const commentsAdapter = createEntityAdapter<Comment>({
	sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const commentSlice = createSlice({
	name: 'comments',
	initialState: commentsAdapter.getInitialState(),
	reducers: {
		setComments: commentsAdapter.setAll,
		upsertComment: commentsAdapter.upsertOne,
		removeComment: commentsAdapter.removeOne,
	},
});

export const { setComments, upsertComment, removeComment } = commentSlice.actions;
export const commentSelectors = commentsAdapter.getSelectors((state: RootState) => state.comments);
export default commentSlice.reducer;
