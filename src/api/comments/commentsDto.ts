import {IUser} from "../auth/authDto";

export interface IComment {
    text: string,
    user: IUser,
    date: string,
}

export interface INewComments {
    postId: string;
    comment: IComment
}

export interface IComments extends INewComments {
    id: string,
}






