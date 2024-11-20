import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    password: string

    @Column()
    username: string


    @Column({ nullable: true })
    image: string


    @DeleteDateColumn()
    deletedAt?: Date;

}
