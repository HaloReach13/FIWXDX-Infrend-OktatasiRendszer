import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";
import { Student } from "../entity/Student";
import { StudentCourse } from "../entity/StudentCourse";

export class CourseController extends Controller {
    repository = AppDataSource.getRepository(Course);
    studentRepository = AppDataSource.getRepository(Student);
    studentCourseRepository = AppDataSource.getRepository(StudentCourse);

    getAll = async (req: any, res: any) => {
        try {
            const entities = await this.repository.find({
                relations: ['subject']
            });
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getOne = async (req: any, res: any) => {
        try {
            const id = req.params['id'];
            const entity = await this.repository.findOne({
                where: { id },
                relations: ['subject']
            });

            if (!entity) {
                return this.handleError(res, null, 404, 'No entity exists with the given id.');
            }

            res.json(entity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    create = async (req: any, res: any) => {
        try {
            const { subjectId, semester, year } = req.body;

            const newCourse = this.repository.create({
                semester,
                year,
                subject: { id: subjectId }
            });

            const saved = await this.repository.save(newCourse);
            res.json(saved);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    enrollStudent = async (req: any, res: any) => {
        try {
            const courseId = req.params['id'];
            const studentId = req.params['studentId'];

            const course = await this.repository.findOne({
                where: { id: courseId },
                relations: ['subject']
            });

            if (!course) {
                return this.handleError(res, null, 404, "No course exists with the given id.");
            }

            const student = await this.studentRepository.findOneBy({ id: studentId });

            if (!student) {
                return this.handleError(res, null, 404, "No student exists with the given id.");
            }

            const existingEnrollment = await this.studentCourseRepository
                .createQueryBuilder('sc')
                .leftJoin('sc.student', 'student')
                .leftJoin('sc.course', 'course')
                .leftJoin('course.subject', 'subject')
                .where('student.id = :studentId', { studentId })
                .andWhere('subject.id = :subjectId', { subjectId: course.subject.id })
                .getOne();

            if (existingEnrollment) {
                return this.handleError(res, null, 409, "Student has already enrolled in this subject previously.");
            }

            const enrollment = this.studentCourseRepository.create({
                student: student,
                course: course
            });

            const saved = await this.studentCourseRepository.save(enrollment);
            res.json(saved);
        }
        catch (err) {
            this.handleError(res, err);
        }
    };

    unenrollStudent = async (req: any, res: any) => {
        try {
            const courseId = req.params['id'];
            const studentId = req.params['studentId'];

            const enrollment = await this.studentCourseRepository
                .createQueryBuilder('sc')
                .leftJoin('sc.student', 'student')
                .leftJoin('sc.course', 'course')
                .where('student.id = :studentId', { studentId })
                .andWhere('course.id = :courseId', { courseId })
                .getOne();

            if (!enrollment) {
                return this.handleError(res, null, 404, 'Student is not enrolled in this course.');
            }

            await this.studentCourseRepository.remove(enrollment);
            res.send();
        }
        catch (err) {
            this.handleError(res, err);
        }
    };

    setGrade = async (req: any, res: any) => {
        try {
            const courseId = req.params['id'];
            const studentId = req.params['studentId'];
            const { grade } = req.body;

            if (grade === undefined || grade === null) {
                return this.handleError(res, null, 400, 'Grade must be provided in the request body.');
            }

            if (!Number.isInteger(grade) || grade < 1 || grade > 5) {
                return this.handleError(res, null, 400, 'Grade must be an integer between 1 and 5.');
            }

            const enrollment = await this.studentCourseRepository
                .createQueryBuilder('sc')
                .leftJoinAndSelect('sc.student', 'student')
                .leftJoinAndSelect('sc.course', 'course')
                .where('student.id = :studentId', { studentId })
                .andWhere('course.id = :courseId', { courseId })
                .getOne();

            if (!enrollment) {
                return this.handleError(res, null, 404, 'Student is not enrolled in this course.');
            }

            enrollment.grade = grade;
            const saved = await this.studentCourseRepository.save(enrollment);
            res.json(saved);
        }
        catch (err) {
            this.handleError(res, err);
        }
    };

    getStudents = async (req: any, res: any) => {
        try {
            const courseId = req.params['id'];

            const course = await this.repository.findOneBy({ id: courseId });
            if (!course) {
                return this.handleError(res, null, 404, 'No course exists with the given id.');
            }

            const enrollments = await this.studentCourseRepository.find({
                where: { course: { id: courseId } },
                relations: ['student'],
            });

            const result = enrollments.map((sc) => ({
                enrollmentId: sc.id,
                grade: sc.grade ?? null,
                student: sc.student,
            }));

            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };
}