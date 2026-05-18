import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectDTO } from '../../../models';
import { Course } from './Course';
import { Instructor } from './Instructor';

@Entity()
export class Subject implements SubjectDTO {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    code!: string;

    @Column()
    name!: string;

    @Column()
    credits!: number;

    @OneToMany(() => Course, (course) => course.subject)
    courses!: Course[];

    @ManyToMany(() => Instructor, (instructor) => instructor.subjects)
    instructors!: Instructor[];
}