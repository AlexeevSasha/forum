import {createAsyncThunk} from "@reduxjs/toolkit";
import {IProfileUpdate, ISignIn, ISignUp} from "../../api/auth/authDto";
import {profileUpdate, searchNameUsers, signUp} from "../../api/auth/authService";
import {defaultAvatar} from "../../hooks/GeneratorAvatar";


interface IProps {
    id: string,
    data: IProfileUpdate;
    cb?: () => void;
}

export const registerThunk = createAsyncThunk(
    "auth/signUp",
    async (data: ISignUp) => {
        const searchName = await searchNameUsers(data.login)
        if (searchName.length !== 0) {
            throw new Error('Такой логин уже существует')
        }
        const response = await signUp(data);

        const user = {userName: response.userName, avatarUrl: response.avatarUrl || defaultAvatar(), id: response.id};
        localStorage.setItem("user", JSON.stringify(user));
        return user;
    },
);

export const loginThunk = createAsyncThunk(
    "auth/signIn",
    async (data: ISignIn) => {
        const searchName = await searchNameUsers(data.login)
        const user = searchName[0];
        if (!user) {
            throw new Error('Пользователя не существует')
        }
        if (user.login !== data.login || user.password !== data.password) {
            throw new Error('Неверный логин или пароль')
        }
        const newUser = {userName: user.userName, avatarUrl: user.avatarUrl || defaultAvatar(), id: user.id}
        localStorage.setItem("user", JSON.stringify(newUser));
        return newUser;
    },
);


export const profileUpdateThunk = createAsyncThunk(
    "auth/profileUpdate",
    async ({id, data, cb}: IProps) => {
        if (data.login) {
            const searchName = await searchNameUsers(data.login)
            if (searchName.length !== 0) {
                throw new Error('Такой логин уже существует')
            }
        }
        const response = await profileUpdate(id, data)
        cb && cb();
        return response;
    },
);