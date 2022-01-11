import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";


@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

}