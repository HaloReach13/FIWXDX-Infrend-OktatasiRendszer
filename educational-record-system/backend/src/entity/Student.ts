import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentDTO } from '../../../models';
import { StudentCourse } from './StudentCourse';

@Entity()
export class Student implements StudentDTO {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    neptunCode!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column()
    currentSemester!: number;

    @Column()
    class!: string;

    @OneToMany(() => StudentCourse, (studentCourse) => studentCourse.student)
    studentCourses!: StudentCourse[];
}