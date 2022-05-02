import {get, post} from "../baseRequest";
import {INewComments} from "./commentsDto";

export const getCommentsId = (id: string) => {
    return get(`comments?postId=${id}`)
}

export const addNewComment = (data: INewComments) => {
    return post('comments', JSON.stringify(data))
};