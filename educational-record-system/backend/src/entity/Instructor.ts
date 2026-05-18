import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InstructorDTO } from '../../../models';
import { Subject } from './Subject';

@Entity()
export class Instructor implements InstructorDTO {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column()
    department!: string;

    @ManyToMany(() => Subject, (subject) => subject.instructors)
    @JoinTable()
    subjects!: Subject[];
}