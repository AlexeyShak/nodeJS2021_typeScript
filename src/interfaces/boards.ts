export interface IBoardCreate{
    title: string,
    columns: Array<Object>
}

export interface IBoard{
    id?: string,
    title: string,
    columns: Array<Object>
}

export interface IBoardUpdate{
    title?: string,
    columns?: Array<Object>
}