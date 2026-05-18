import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Course } from "../entity/Course";

export class CourseController extends Controller {
    repository = AppDataSource.getRepository(Course);
}