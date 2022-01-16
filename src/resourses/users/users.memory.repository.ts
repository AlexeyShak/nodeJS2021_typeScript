import 'reflect-metadata'
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany} from "typeorm";
import { Task } from '../tasks/tasks.memory.repository'

@Entity({name: 'huita'})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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