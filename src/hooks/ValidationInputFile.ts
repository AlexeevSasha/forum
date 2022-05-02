

export const imgFile = (file: File): Promise<string> => {
    return new Promise((res: (value: string) => void) => {
        const type = file.type.split('/')[1];
        if (type !== 'png' && type !== 'jpeg') {
            res('The photo only contains the format jpeg/png')
        } else if ((file.size / 1024) / 1024 > 1) {
            res('The size should not exceed 1 MB')
        } else {
            res('')
        }
    });
};

export const musicFile = (file: File): Promise<string> => {
    return new Promise((res: (value: string) => void) => {
        const type = file.type.split('/')[1];
        if (type !== 'mpeg') {
            res('The music only contains the format mp3')
        } else if ((file.size / 1024) / 1024 > 5) {
            res('The size should not exceed 5 MB')
        } else {
            res('')
        }
    });
};

export const videoFile = (file: File): Promise<string> => {
    return new Promise((res: (value: string) => void) => {
        const type = file.type.split('/')[1];
        if (type !== 'mp4') {
            res('The music only contains the format mp4')
        }  else {
            res('')
        }
    });
};