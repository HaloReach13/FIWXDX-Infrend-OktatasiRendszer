import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { AdministratorDTO } from "../../../models";

@Entity('administrator')
export class Administrator implements AdministratorDTO {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column({ unique: true })
    email!: string

    @Column({ select: false })
    password!: string
}