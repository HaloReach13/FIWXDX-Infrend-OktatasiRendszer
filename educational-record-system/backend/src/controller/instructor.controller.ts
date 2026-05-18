import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Instructor } from "../entity/Instructor";

export class InstructorController extends Controller {
    repository = AppDataSource.getRepository(Instructor);
}