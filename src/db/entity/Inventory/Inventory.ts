import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from 'typeorm';
import Department from '../Department/Department';
import Stock from '../Stock/Stock';
@Entity()
export class Inventory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(type => Department,{ onDelete: 'CASCADE' })
    deparment!: Department;

    @OneToMany(type => Stock, stock => stock.inventory,{ onDelete: 'CASCADE' })
    stock: Stock[];
}

export default Inventory
