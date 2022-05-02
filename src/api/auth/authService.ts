import {IProfileUpdate, ISignUp, IUserResponse} from "./authDto";
import {get, patch, post} from "../baseRequest";


export const signUp = (data: ISignUp) => {
    return post('users', JSON.stringify(data))
}

export const searchNameUsers = (name: string): Promise<IUserResponse[]> => {
    return get(`users?login=${name}`)
}

export const profileUpdate = (id: string, data: IProfileUpdate) => {
    return patch(`users/${id}`, JSON.stringify(data))
};
