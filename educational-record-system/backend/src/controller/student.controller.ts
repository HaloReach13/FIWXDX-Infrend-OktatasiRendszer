import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Student } from "../entity/Student";

export class StudentController extends Controller {
    repository = AppDataSource.getRepository(Student);
};