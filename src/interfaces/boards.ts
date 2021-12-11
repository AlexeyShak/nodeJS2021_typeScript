export interface IBoardCreate{
    id?:string,
    title: string,
    columns: Array<string>
}

export interface IBoard{
    id?: string,
    title: string,
    columns: Array<string>
}

export interface IBoardUpdate{
    title?: string,
    columns?: Array<string>
}