import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
@Entity()
export class Department {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    code: string;

    @Column()
    name: string;

    @Column()
    description: string;
}

export default Department
