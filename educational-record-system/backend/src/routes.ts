import express from "express";
import { StudentController } from "./controller/student.controller";
import { InstructorController } from "./controller/instructor.controller";
import { SubjectController } from "./controller/subject.controller";
import { CourseController } from "./controller/course.controller";

export const appRouter = express.Router();

const studentController = new StudentController();
appRouter.get('/students', studentController.getAll);
appRouter.get('/students/:id', studentController.getOne);
appRouter.post('/students', studentController.create);
appRouter.put('/students', studentController.update);
appRouter.delete('/students/:id', studentController.delete);

const instructorController = new InstructorController();
appRouter.get('/instructors', instructorController.getAll);
appRouter.get('/instructors/:id', instructorController.getOne);
appRouter.post('/instructors', instructorController.create);
appRouter.put('/instructors', instructorController.update);
appRouter.delete('/instructors/:id', instructorController.delete);

const subjectController = new SubjectController();
appRouter.get('/subjects', subjectController.getAll);
appRouter.get('/subjects/:id', subjectController.getOne);
appRouter.post('/subjects', subjectController.create);
appRouter.put('/subjects', subjectController.update);
appRouter.delete('/subjects/:id', subjectController.delete);

const courseController = new CourseController();
appRouter.get('/courses', courseController.getAll);
appRouter.get('/courses/:id', courseController.getOne);
appRouter.post('/courses', courseController.create);
appRouter.put('/courses', courseController.update);
appRouter.delete('/courses/:id', courseController.delete);