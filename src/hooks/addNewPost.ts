import {IAddNewPost} from "../api/posts/postsDto";

interface IProps {
    text: string;
    title: string;
    img: string;
    video: string;
    audio: string
}

export const newPost = (props: IProps): IAddNewPost => {
    const {text, title, img, video, audio} = props;

    const data: IAddNewPost = {
        date: String(new Date()),
        text,
        title,
        views: 0,
        answers: 0,
        media: {img, video, audio},
        user: JSON.parse(`${localStorage.getItem("user")}`)
    }
    return data;
}