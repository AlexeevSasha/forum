import {createSlice} from '@reduxjs/toolkit'
import {LOADING_STATUS} from "../types";
import {IPostsResponse} from "../../api/posts/postsDto";
import {addNewPostThunk, editPostThunk, getAllPostsThunk, getPostIdThunk, getSortPostThunk} from "./postsAction";


interface IPosts {
    posts: IPostsResponse[] | null;
    popularPosts: IPostsResponse[] | null;
    post: IPostsResponse | null;
    status: LOADING_STATUS;
    error: string | undefined;
}

const initialState: IPosts = {
    posts: null,
    popularPosts: null,
    post: null,
    status: LOADING_STATUS.NEVER,
    error: undefined
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //getAllPosts
        builder.addCase(getAllPostsThunk.pending, (state) => {
            state.error = undefined;
            state.status = LOADING_STATUS.LOADING;
            state.posts = null;
        });
        builder.addCase(getAllPostsThunk.fulfilled, (state, action) => {
            state.status = LOADING_STATUS.LOADED;
            state.posts = action.payload;
        });
        builder.addCase(getAllPostsThunk.rejected, (state, action) => {
            state.status = LOADING_STATUS.ERROR;
            state.error = action.error.message;
        });

        //getPostId
        builder.addCase(getPostIdThunk.pending, (state) => {
            state.error = undefined;
            state.status = LOADING_STATUS.LOADING;
            state.post = null;
        });
        builder.addCase(getPostIdThunk.fulfilled, (state, action) => {
            state.status = LOADING_STATUS.LOADED
            state.post = action.payload[0];
        });
        builder.addCase(getPostIdThunk.rejected, (state, action) => {
            state.status = LOADING_STATUS.ERROR
            state.error = action.error.message;
        });

        //getSort
        builder.addCase(getSortPostThunk.pending, (state) => {
            state.error = undefined;
            state.status = LOADING_STATUS.LOADING;
            state.popularPosts = null;
        });
        builder.addCase(getSortPostThunk.fulfilled, (state, action) => {
            state.status = LOADING_STATUS.LOADED
            state.popularPosts = action.payload.splice(0, 3);
        });
        builder.addCase(getSortPostThunk.rejected, (state, action) => {
            state.status = LOADING_STATUS.ERROR
            state.error = action.error.message;
        });

        //addNewPost
        builder.addCase(addNewPostThunk.pending, (state) => {
            state.error = undefined;
            state.status = LOADING_STATUS.LOADING;

        });
        builder.addCase(addNewPostThunk.fulfilled, (state, action) => {
            state.status = LOADING_STATUS.LOADED;
        });
        builder.addCase(addNewPostThunk.rejected, (state, action) => {
            state.status = LOADING_STATUS.ERROR
            state.error = action.error.message;
        });

        //editPost
        builder.addCase(editPostThunk.pending, (state) => {
            state.error = undefined;
            state.status = LOADING_STATUS.LOADING;

        });
        builder.addCase(editPostThunk.fulfilled, (state, action) => {
            state.status = LOADING_STATUS.LOADED;
        });
        builder.addCase(editPostThunk.rejected, (state, action) => {
            state.status = LOADING_STATUS.ERROR
            state.error = action.error.message;
        });
    }
})
export default postsSlice.reducer