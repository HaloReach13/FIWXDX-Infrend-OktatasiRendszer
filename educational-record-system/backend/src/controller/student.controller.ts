import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";
import { StudentCourse } from "../entity/StudentCourse";
import { In, Not, IsNull } from "typeorm";

export class StudentController extends Controller {
    repository = AppDataSource.getRepository(Student);
    studentCourseRepository = AppDataSource.getRepository(StudentCourse);

    getCourses = async (req: any, res: any) => {
        try {
            const id = req.params['id'];

            const student = await this.repository.findOneBy({ id });
            if (!student) {
                return this.handleError(res, null, 404, "No student exists with the given id.");
            }

            const studentCourses = await this.studentCourseRepository.find({
                where: { student: { id } },
                relations: ['course', 'course.subject']
            });

            const result = studentCourses.map((sc) => ({
                studentCourseId: sc.id,
                grade: sc.grade ?? null,
                course: {
                    id: sc.course.id,
                    semester: sc.course.semester,
                    year: sc.course.year,
                    subject: {
                        id: sc.course.subject.id,
                        code: sc.course.subject.code,
                        name: sc.course.subject.name,
                        credits: sc.course.subject.credits,
                    },
                },
            }));

            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getAverage = async (req: any, res: any) => {
        try {
            const id = req.params['id'];

            const student = await this.repository.findOneBy({ id });
            if (!student) {
                return this.handleError(res, null, 404, "No student exists with the given id.");
            }

            const studentCourses = await this.studentCourseRepository.find({
                where: { student: { id } },
                relations: ['course', 'course.subject']
            });

            const graded = studentCourses.filter((sc) => sc.grade !== null && sc.grade !== undefined);
 
            if (graded.length === 0) {
                return res.json({ average: null, message: 'No graded courses found.' });
            }

            const totalCredits = graded.reduce((sum, sc) => sum + sc.course.subject.credits, 0);
            const weightedSum = graded.reduce((sum, sc) => sum + sc.grade! * sc.course.subject.credits, 0);
            const average = totalCredits > 0 ? weightedSum / totalCredits : 0;

            res.json({
                studentId: student.id,
                average: Math.round(average * 100) / 100,
                gradedCourseCount: graded.length,
                totalCredits,
            });
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getClassAverage = async (req: any, res: any) => {
    try {
        const className = req.params['className'];

        const studentsInClass = await this.repository.find({
            where: { class: className }
        });

        if (studentsInClass.length === 0) {
            return res.json({ average: null });
        }

        const studentIds = studentsInClass.map(s => s.id);

        const enrollments = await this.studentCourseRepository.find({
            where: {
                student: { id: In(studentIds) },
                grade: Not(IsNull())
            }
        });

        if (enrollments.length === 0) {
            return res.json({ average: null });
        }

        const sum = enrollments.reduce((acc, curr) => acc + (curr.grade ?? 0), 0);
        const classAverage = Math.round((sum / enrollments.length) * 100) / 100;

        res.json({ average: classAverage });

    } catch (err) {
        this.handleError(res, err);
    }
};
};