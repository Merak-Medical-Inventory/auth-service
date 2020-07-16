import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import User from '@db/entity/user/User';
@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;
}

export default User
