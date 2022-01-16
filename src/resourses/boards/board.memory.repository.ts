import { IBoard } from "../../interfaces/boards";
import 'reflect-metadata';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';

import { ColumnEntity } from '../columns/columns';
import { Task } from '../tasks/tasks.memory.repository';

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => ColumnEntity, (column) => column.board)
  columns!: ColumnEntity[];

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];
}

// let boards: IBoard[] = [{
//     id: 'c8f746c3-7089-4abc-af07-d66c5548b8f0',
//     title: 'Random board',
//     columns: []
// },
// {
//     id: "00000000-0000-0000-0000-000000000000",
//     title: 'Random board',
//     columns: []
// }
// ];
// /**
//  * Method to return boards
//  * @param none
//  * @returns all bords instance of IBoard[] or empty array
//  */
// export const getBoards = (): IBoard[] => {
//     return boards; 
// }

// /**
//  * Method assign a data value to bards
//  * @param data instance of IBoard[]
//  * @returns void
//  */
// export const setBoards = (data: IBoard[]): void => {
//     boards = data;
// }