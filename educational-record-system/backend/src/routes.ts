import express from "express";
import { StudentController } from "./controller/student.controller";
import { InstructorController } from "./controller/instructor.controller";
import { SubjectController } from "./controller/subject.controller";
import { CourseController } from "./controller/course.controller";

export const appRouter = express.Router();

const studentController = new StudentController();
appRouter.get('/students', studentController.getAll);
appRouter.get('/students/:id', studentController.getOne);
appRouter.get("/students/:id/courses", studentController.getCourses);
appRouter.get("/students/:id/average", studentController.getAverage);
appRouter.get('/students/class-average/:className', studentController.getClassAverage);
appRouter.post('/students', studentController.create);
appRouter.put('/students', studentController.update);
appRouter.delete('/students/:id', studentController.delete);

const instructorController = new InstructorController();
appRouter.get('/instructors', instructorController.getAll);
appRouter.get('/instructors/:id', instructorController.getOne);
appRouter.get('/instructors/:id/subjects', instructorController.getSubjects);
appRouter.post('/instructors', instructorController.create);
appRouter.put('/instructors', instructorController.update);
appRouter.delete('/instructors/:id', instructorController.delete);

const subjectController = new SubjectController();
appRouter.get('/subjects', subjectController.getAll);
appRouter.get('/subjects/:id', subjectController.getOne);
appRouter.get('/subjects/:id/instructors', subjectController.getInstructors);
appRouter.post('/subjects', subjectController.create);
appRouter.post('/subjects/:id/instructors/:instructorId', subjectController.assignInstructor);
appRouter.put('/subjects', subjectController.update);
appRouter.delete('/subjects/:id', subjectController.delete);
appRouter.delete('/subjects/:id/instructors/:instructorId', subjectController.removeInstructor);

const courseController = new CourseController();
appRouter.get('/courses', courseController.getAll);
appRouter.get('/courses/:id', courseController.getOne);
appRouter.get("/courses/:id/students", courseController.getStudents);
appRouter.post('/courses', courseController.create);
appRouter.post("/courses/:id/students/:studentId", courseController.enrollStudent);
appRouter.put('/courses', courseController.update);
appRouter.put("/courses/:id/students/:studentId/grade", courseController.setGrade);
appRouter.delete('/courses/:id', courseController.delete);
appRouter.delete("/courses/:id/students/:studentId", courseController.unenrollStudent);