import { configureStore } from '@reduxjs/toolkit'
import authSlice from "../../modules/auth/authSlice";
import postsSlice from "../../modules/posts/postsSlice";
import commentsSlice from "../../modules/comments/commentsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        posts: postsSlice,
        comments: commentsSlice
}
})

export type RootState = ReturnType<typeof store.getState>;