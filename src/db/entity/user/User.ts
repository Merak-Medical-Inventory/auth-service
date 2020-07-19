import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import Rol from "../Rol/Rol";
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

    @ManyToOne(type => Rol, { onDelete: 'CASCADE' })
    rol: Rol;
}

export default User