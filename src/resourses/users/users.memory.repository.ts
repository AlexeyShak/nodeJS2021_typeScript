import 'reflect-metadata'
import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany} from "typeorm";
import { Task } from '../tasks/tasks.memory.repository'

@Entity({name: 'users'})
export class User extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  toResponse() {
    return {
      id: this.id,
      name: this.name,
      login: this.login,
    };
  }
}