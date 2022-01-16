
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
