import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import Privilege from "../Privilege/Privilege";
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @ManyToOne(type => Privilege, privilege => privilege.users, { onDelete: 'CASCADE' })
    privilege: Privilege;
}

export default User