export interface IAddNewPost {
    date: string;
    title: string;
    text: string;
    views: number;
    answers: number;
    media: {
        img: string;
        audio: string;
        video: string;
    },
    user: {
        userName: string;
        avatarUrl: string;
        id: string;
    }
}

export interface IPostsResponse extends IAddNewPost {
    id: string,
}

export interface IEditPost {
    date: string;
    title: string;
    text: string;
    media: {
        img: string;
        audio: string;
        video: string;
    }
}
