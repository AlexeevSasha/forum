import {createAsyncThunk} from "@reduxjs/toolkit";
import {addNewPost, editPost, getAddIdPost, getPosts, getSortPost} from "../../api/posts/postsService";
import {IAddNewPost, IEditPost} from "../../api/posts/postsDto";


export const getAllPostsThunk = createAsyncThunk(
    "posts/getAllPosts",
    async (name? :string) => {
        const response = await getPosts(name)
        return response;
    },
);

export const getPostIdThunk = createAsyncThunk(
    "posts/getPostId",
    async (id: string) => {
        const response = await getAddIdPost(id)
        return response;
    },
);

export const getSortPostThunk = createAsyncThunk(
    "posts/sortPost",
    async () => {
        const response = await getSortPost();
        return response;
    },
);

export const addNewPostThunk = createAsyncThunk(
    "posts/addNewPost",
    async ({data, cb} : {data : IAddNewPost, cb: () => void}) => {
        const response = await addNewPost(data)
        cb();
        return response;
    },
);
export const editPostThunk = createAsyncThunk(
    "posts/editPost",
    async ({id, data, cb} : {id: string, data : IEditPost, cb: () => void}) => {
        const response = await editPost(id, data)
        cb();
        return response;
    },
);




