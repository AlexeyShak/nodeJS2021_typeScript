import { ITask } from "../../interfaces/tasks";


export let tasks: ITask[]= [{
    id: 'c8f746c3-7089-4abc-af07-000000000000',
    title: 'Random title',
    order: 1,
    description: 'Some description',
    userId: null,
    boardId: 'c8f746c3-7089-4abc-af07-d66c5548b8f0',
    columnId: "11111111-0000-0000-0000-000000000000",
},
{
    id: "00000000-0000-0000-0000-000000000001",
    title: 'Task 2',
    order: 2,
    description: 'Some other description',
    userId: '73dfa0d7-e233-4762-9037-5ac8f433c971',
    boardId: '00000000-0000-0000-0000-000000000000',
    columnId: "22222222-0000-0000-0000-000000000000"
}
];

export const getTasks = (): ITask[] =>tasks

export const taskFilter = (boardId: string): void =>{
    tasks = tasks.filter(el => el.boardId !== boardId)
 }
export const taskModify = (data: ITask[]): void =>{
    tasks = data;
}