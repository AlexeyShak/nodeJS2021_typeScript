
export interface ITask{
    id?: string,
    title: string,
    order: number,
    description:string,
    userId: string | null,
    boardId: string,
    columnId: string | null
}

export interface ITaskUpdate{
    id?: string,
    title?: string,
    order?: number,
    description?:string,
    userId?: string | null,
    boardId?: string,
    columnId?: string | null
}