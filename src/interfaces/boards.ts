import { ColumnInterface } from "./column";


export interface IBoard{
    id?: string,
    title: string,
    columns: ColumnInterface[]
}

export interface IBoardUpdate{
    title?: string,
    columns?: ColumnInterface[]
}