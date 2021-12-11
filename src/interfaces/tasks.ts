export type ITask = ITaskCreate
export interface ITaskCreate{
    id?: string,
    title: string,
    order: number,
    description:string,
    userId: string|null,
    boardId: string,
    columnId: string
}

export interface ITaskUpdate{
    id?: string,
    title?: string,
    order?: number,
    description?:string,
    userId?: string|null,
    boardId?: string,
    columnId?: string
}