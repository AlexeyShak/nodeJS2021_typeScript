
export interface IUserCreate {
    name: string,
    login: string,
    password?: string
}

export interface IUser extends IUserCreate {
    id?: string
}

export interface IUserUpdate {
    name?: string,
    login?: string,
    password?: string
}