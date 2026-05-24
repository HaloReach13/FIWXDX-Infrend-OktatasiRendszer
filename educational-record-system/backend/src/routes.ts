import express from "express";
import { AdministratorController } from "./controller/administrator.controller";
import { StudentController } from "./controller/student.controller";
import { InstructorController } from "./controller/instructor.controller";
import { SubjectController } from "./controller/subject.controller";
import { CourseController } from "./controller/course.controller";
import { checkAdministrator } from "./protect-routes";

export const appRouter = express.Router();

const administratorController = new AdministratorController();
appRouter.post('/administrators/register', administratorController.create);
appRouter.post('/administrators/login', administratorController.login);

const studentController = new StudentController();
appRouter.get('/students', studentController.getAll);
appRouter.get('/students/:id', studentController.getOne);
appRouter.get("/students/:id/courses", studentController.getCourses);
appRouter.get("/students/:id/average", studentController.getAverage);
appRouter.get('/students/class-average/:className', studentController.getClassAverage);
appRouter.post('/students', checkAdministrator, studentController.create);
appRouter.put('/students', checkAdministrator, studentController.update);
appRouter.delete('/students/:id', checkAdministrator, studentController.delete);

const instructorController = new InstructorController();
appRouter.get('/instructors', instructorController.getAll);
appRouter.get('/instructors/:id', instructorController.getOne);
appRouter.get('/instructors/:id/subjects', instructorController.getSubjects);
appRouter.post('/instructors', checkAdministrator, instructorController.create);
appRouter.put('/instructors', checkAdministrator, instructorController.update);
appRouter.delete('/instructors/:id', checkAdministrator, instructorController.delete);

const subjectController = new SubjectController();
appRouter.get('/subjects', subjectController.getAll);
appRouter.get('/subjects/:id', subjectController.getOne);
appRouter.get('/subjects/:id/instructors', subjectController.getInstructors);
appRouter.post('/subjects', checkAdministrator, subjectController.create);
appRouter.post('/subjects/:id/instructors/:instructorId', checkAdministrator, subjectController.assignInstructor);
appRouter.put('/subjects', checkAdministrator, subjectController.update);
appRouter.delete('/subjects/:id', checkAdministrator, subjectController.delete);
appRouter.delete('/subjects/:id/instructors/:instructorId', checkAdministrator, subjectController.removeInstructor);

const courseController = new CourseController();
appRouter.get('/courses', courseController.getAll);
appRouter.get('/courses/:id', courseController.getOne);
appRouter.get("/courses/:id/students", courseController.getStudents);
appRouter.post('/courses', checkAdministrator, courseController.create);
appRouter.post("/courses/:id/students/:studentId", checkAdministrator, courseController.enrollStudent);
appRouter.put('/courses', checkAdministrator, courseController.update);
appRouter.put("/courses/:id/students/:studentId/grade", checkAdministrator, courseController.setGrade);
appRouter.delete('/courses/:id', checkAdministrator, courseController.delete);
appRouter.delete("/courses/:id/students/:studentId", checkAdministrator, courseController.unenrollStudent);