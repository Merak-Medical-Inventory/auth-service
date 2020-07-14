import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import User from "@db/entity/user/User";

@Entity()
export class privilege {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany((type) => User, (user) => user.privilege)
  users: User[];
}

export default privilege;
