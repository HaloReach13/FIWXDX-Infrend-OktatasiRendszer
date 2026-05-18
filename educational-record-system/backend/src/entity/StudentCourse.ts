import { Entity, PrimaryGeneratedColumn, Column, ManyToOne,  } from 'typeorm';
import { StudentCourseDTO } from '../../../models';
import { Student } from './Student';
import { Course } from './Course';

@Entity()
export class StudentCourse implements StudentCourseDTO {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Student, (student) => student.studentCourses, {onDelete: 'CASCADE'})
    student!: Student;

    @ManyToOne(() => Course, (course) => course.studentCourses, {onDelete: 'CASCADE'})
    course!: Course;

    @Column({type: 'int', nullable: true})
    grade?: number;
}