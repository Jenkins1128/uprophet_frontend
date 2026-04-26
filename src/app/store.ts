import { configureStore } from '@reduxjs/toolkit';
import commentsReducer from '../features/containers/QuoteComments/redux/quoteCommentsSlice';
import postCommentReducer from '../features/containers/QuoteComments/redux/postCommentSlice';
import getQuotePostReducer from '../features/containers/QuoteComments/redux/getQuotePostSlice';
import searchReducer from '../features/containers/Searchresults/redux/searchSlice';
import profileReducer from '../features/containers/Profile/redux/profileSlice';
import userInfoReducer from '../features/containers/Profile/redux/userInfoSlice';
import favoritersReducer from '../features/containers/Favoriters/redux/favoritersSlice';
import favoritingReducer from '../features/containers/Favoriting/redux/favoritingSlice';
import notificationsReducer from '../features/containers/Notifications/redux/notificationsSlice';
import currentUserInfoReducer from '../features/containers/Profile/EditProfile/redux/currentUserInfoSlice';
import editBioReducer from '../features/containers/Profile/EditProfile/redux/editBioSlice';
import editPhotoReducer from '../features/containers/Profile/EditProfile/redux/editPhotoSlice';

export const store = configureStore({
	reducer: {
		comments: commentsReducer,
		postComment: postCommentReducer,
		quotePost: getQuotePostReducer,
		search: searchReducer,
		profile: profileReducer,
		userInfo: userInfoReducer,
		favoriters: favoritersReducer,
		favoriting: favoritingReducer,
		notifications: notificationsReducer,
		currentUserInfo: currentUserInfoReducer,
		changeBio: editBioReducer,
		changePhoto: editPhotoReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
