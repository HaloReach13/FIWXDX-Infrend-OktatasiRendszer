import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { CourseDTO } from '../../../models';
import { Subject } from './Subject';
import { StudentCourse } from './StudentCourse';

@Entity()
export class Course implements CourseDTO {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Subject, (subject) => subject.courses, {onDelete: 'CASCADE'})
    subject!: Subject;

    @Column()
    semester!: number;

    @Column()
    year!: number;

    @OneToMany(() => StudentCourse, (studentCourse) => studentCourse.course)
    studentCourses!: StudentCourse[];
}