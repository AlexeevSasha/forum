import {createAsyncThunk} from "@reduxjs/toolkit";
import { addNewComment, getCommentsId} from "../../api/comments/commentsService";
import { INewComments} from "../../api/comments/commentsDto";



export const getCommentsIdThunk = createAsyncThunk(
    "comments/getCommentsId",
    async (id :string) => {
        const response  = await getCommentsId(id)
        return response;
    },
);

export const addNewCommentsThunk = createAsyncThunk(
    "comments/addNewComments",
    async (data :INewComments) => {
        const response  = await addNewComment(data)
        return response;
    },
);