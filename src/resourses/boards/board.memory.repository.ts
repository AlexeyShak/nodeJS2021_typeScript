import { IBoard } from "../../interfaces/boards";

let boards:IBoard[] = [{
    id: 'c8f746c3-7089-4abc-af07-d66c5548b8f0',
    title: 'Random board',
    columns: []
},
{
    id: "00000000-0000-0000-0000-000000000000",
    title: 'Random board',
    columns: []
}
];

export const getBoards = ():IBoard[] =>{
    return boards;
}
export const setBoards = (data:IBoard[]):void => {
    boards = data;
}