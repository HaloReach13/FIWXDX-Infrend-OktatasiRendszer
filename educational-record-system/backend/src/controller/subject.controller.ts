import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Subject } from "../entity/Subject";

export class SubjectController extends Controller {
    repository = AppDataSource.getRepository(Subject);
}