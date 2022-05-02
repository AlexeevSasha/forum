export interface ISignIn {
    login: string;
    password: string;
}

export interface ISignUp {
    userName: string;
    avatarUrl: string | null,
    login: string;
    password: string;
}

export interface IUserResponse {
    login: string;
    userName: string;
    avatarUrl: string | null;
    password: string;
    id: string;
}

export interface IUser {
    userName: string;
    avatarUrl: string | null;
    id: string;
}

export interface IProfileUpdate {
    login?: string;
    avatarUrl?: string | null;
    password?: string
}

export interface ILogin {
    login: string;
}

export interface IPassword {
    password: string;
}