import {get, patch, post} from "../baseRequest";
import {IAddNewPost, IEditPost, IPostsResponse} from "./postsDto";


export const getPosts = (name?: string): Promise<IPostsResponse[]> => {
    if (name) return get(`posts?title_like=^${name}`)
    return get('posts')
};

export const getAddIdPost = (id: string): Promise<IPostsResponse[]> => {
    return get(`posts?id=${id}`)
};

export const getSortPost = (): Promise<IPostsResponse[]> => {
    return get('posts?_sort=views&_order=DESC')
};

export const addNewPost = (data: IAddNewPost) => {
    return post('posts', JSON.stringify(data))
};

export const editPost = (id: string, data: IEditPost) => {
    return patch(`posts/${id}`, JSON.stringify(data))
};
