import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Instructor } from "../entity/Instructor";

export class InstructorController extends Controller {
    repository = AppDataSource.getRepository(Instructor);

    getSubjects = async (req: any, res: any) => {
        try {
            const id = req.params['id'];

            const instructor = await this.repository.findOne({
                where: { id: id },
                relations: ['subjects']
            });

            if (!instructor) {
                return this.handleError(res, null, 404, "No instructor exists with the given id.");
            }

            res.json(instructor.subjects);
        } catch (err) {
            this.handleError(res, err);
        }
    }
}