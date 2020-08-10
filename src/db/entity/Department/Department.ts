import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
@Entity("deparment")
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
